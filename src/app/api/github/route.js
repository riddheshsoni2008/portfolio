import { NextResponse } from "next/server";
import fallbackContribData from "@/data/github-contributions-fallback.json";

// Cache in memory for 15 minutes to prevent GitHub rate limiting
let cachedData = null;
let lastFetchTime = 0;
const CACHE_TTL = 15 * 60 * 1000;

// High-fidelity fallback snapshot if APIs are offline or rate-limited
const FALLBACK_PROFILE = {
  login: "riddheshsoni2008",
  name: "Riddhesh soni",
  avatar_url: "https://avatars.githubusercontent.com/u/225166242?v=4",
  html_url: "https://github.com/riddheshsoni2008",
  bio: "Full-Stack Developer | MERN & Next.js Specialist",
  public_repos: 23,
  followers: 7,
  following: 2,
  hireable: true,
  created_at: "2025-08-07T09:15:48Z",
};

export async function GET() {
  const now = Date.now();

  if (cachedData && now - lastFetchTime < CACHE_TTL) {
    return NextResponse.json(cachedData, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    });
  }

  try {
    const headers = {
      "User-Agent": "riddhesh-portfolio-app",
      Accept: "application/vnd.github.v3+json",
    };

    // Parallel fetch from GitHub User API, Repos API, and Contributions API
    const [userRes, reposRes, contribRes] = await Promise.allSettled([
      fetch("https://api.github.com/users/riddheshsoni2008", {
        headers,
        next: { revalidate: 900 },
      }),
      fetch(
        "https://api.github.com/users/riddheshsoni2008/repos?per_page=100&sort=updated",
        {
          headers,
          next: { revalidate: 900 },
        }
      ),
      fetch(
        "https://github-contributions-api.jogruber.de/v4/riddheshsoni2008?y=last",
        {
          next: { revalidate: 900 },
        }
      ),
    ]);

    // 1. Process User Profile
    let user = FALLBACK_PROFILE;
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      const data = await userRes.value.json();
      user = {
        login: data.login || FALLBACK_PROFILE.login,
        name: data.name || FALLBACK_PROFILE.name,
        avatar_url: data.avatar_url || FALLBACK_PROFILE.avatar_url,
        html_url: data.html_url || FALLBACK_PROFILE.html_url,
        bio: data.bio || FALLBACK_PROFILE.bio,
        public_repos: data.public_repos ?? FALLBACK_PROFILE.public_repos,
        followers: data.followers ?? FALLBACK_PROFILE.followers,
        following: data.following ?? FALLBACK_PROFILE.following,
        hireable: data.hireable ?? FALLBACK_PROFILE.hireable,
        created_at: data.created_at || FALLBACK_PROFILE.created_at,
      };
    }

    // 2. Process Repositories
    let repos = [];
    let totalStars = 2;
    let totalForks = 0;
    const languagesMap = {};

    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      const reposData = await reposRes.value.json();
      if (Array.isArray(reposData)) {
        totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        totalForks = reposData.reduce((acc, r) => acc + (r.forks_count || 0), 0);

        reposData.forEach((r) => {
          if (r.language) {
            languagesMap[r.language] = (languagesMap[r.language] || 0) + 1;
          }
        });

        repos = reposData.slice(0, 8).map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description || "Open source project on GitHub",
          html_url: r.html_url,
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          language: r.language || "JavaScript",
          updated_at: r.updated_at,
        }));
      }
    }

    // 3. Process Contributions
    let contributions = [];
    let totalContributions = 538;
    let maxStreak = 5;
    let currentStreak = 0;
    let activeDaysCount = 48;

    let contribData = null;
    if (contribRes.status === "fulfilled" && contribRes.value.ok) {
      contribData = await contribRes.value.json();
    }
    if (!contribData?.contributions || !Array.isArray(contribData.contributions) || contribData.contributions.length === 0) {
      contribData = fallbackContribData;
    }

    if (contribData?.contributions && Array.isArray(contribData.contributions)) {
      contributions = contribData.contributions;
      totalContributions =
        contribData.total?.lastYear ??
        contribData.total?.["2026"] ??
        totalContributions;

      // Compute streak & active days
      let tempStreak = 0;
      let highest = 0;
      let activeCount = 0;

      for (let i = 0; i < contributions.length; i++) {
        if (contributions[i].count > 0) {
          tempStreak++;
          activeCount++;
          if (tempStreak > highest) highest = tempStreak;
        } else {
          tempStreak = 0;
        }
      }
      maxStreak = highest;
      activeDaysCount = activeCount;

      // Current streak ending today or yesterday
      let curr = 0;
      for (let i = contributions.length - 1; i >= 0; i--) {
        if (contributions[i].count > 0) {
          curr++;
        } else {
          // allow 0 on current day if it's still ongoing
          if (i === contributions.length - 1) continue;
          break;
        }
      }
      currentStreak = curr;
    }

    const payload = {
      user,
      stats: {
        totalContributions,
        maxStreak,
        currentStreak,
        activeDaysCount,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        totalStars,
        totalForks,
        languages: Object.entries(languagesMap)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => ({ name, count })),
      },
      contributions,
      featuredRepos: repos,
      timestamp: Date.now(),
    };

    cachedData = payload;
    lastFetchTime = now;

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);

    // If cached data exists from before, return it
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Return fallback payload
    return NextResponse.json({
      user: FALLBACK_PROFILE,
      stats: {
        totalContributions: 538,
        maxStreak: 5,
        currentStreak: 0,
        activeDaysCount: 48,
        publicRepos: 23,
        followers: 7,
        following: 2,
        totalStars: 2,
        totalForks: 0,
        languages: [
          { name: "TypeScript", count: 12 },
          { name: "JavaScript", count: 8 },
        ],
      },
      contributions: fallbackContribData?.contributions || [],
      featuredRepos: [],
      fallback: true,
      timestamp: Date.now(),
    });
  }
}
