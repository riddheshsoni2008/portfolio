"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import fallbackContribData from "@/data/github-contributions-fallback.json";
import {
  GitBranch,
  GitCommit,
  GitFork,
  Star,
  Flame,
  ExternalLink,
  Sparkles,
  Calendar,
  CheckCircle2,
  Code2,
  RefreshCw,
} from "lucide-react";

// Theme palettes for contribution squares
const PALETTES = {
  emerald: {
    name: "GitHub Classic",
    indicator: "#39d353",
    levels: [
      "bg-[#161B22] border-[#21262D]", // 0
      "bg-[#0e4429] border-[#145a32]", // 1
      "bg-[#006d32] border-[#008f43]", // 2
      "bg-[#26a641] border-[#2ecc71]", // 3
      "bg-[#39d353] border-[#58f375] shadow-[0_0_8px_rgba(57,211,83,0.4)]", // 4
    ],
    hoverGlow: "rgba(57, 211, 83, 0.5)",
  },
  cyan: {
    name: "Cyber Blue",
    indicator: "#38bdf8",
    levels: [
      "bg-[#161B22] border-[#21262D]",
      "bg-[#075985] border-[#0284c7]",
      "bg-[#0284c7] border-[#38bdf8]",
      "bg-[#0ea5e9] border-[#7dd3fc]",
      "bg-[#38bdf8] border-[#bae6fd] shadow-[0_0_8px_rgba(56,189,248,0.4)]",
    ],
    hoverGlow: "rgba(56, 189, 248, 0.5)",
  },
  amber: {
    name: "Solar Gold",
    indicator: "#eab308",
    levels: [
      "bg-[#161B22] border-[#21262D]",
      "bg-[#713f12] border-[#a16207]",
      "bg-[#a16207] border-[#ca8a04]",
      "bg-[#ca8a04] border-[#eab308]",
      "bg-[#eab308] border-[#fef08a] shadow-[0_0_8px_rgba(234,179,8,0.4)]",
    ],
    hoverGlow: "rgba(234, 179, 8, 0.5)",
  },
};

const LANG_COLORS = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#563D7C",
  Python: "#3572A5",
  default: "#8B949E",
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Fallback repos if API is still loading
const INITIAL_REPOS = [
  {
    id: 1,
    name: "zealjewellers",
    description: "Modern high-performance web platform built with TypeScript & Next.js",
    html_url: "https://github.com/riddheshsoni2008/zealjewellers",
    stars: 1,
    forks: 0,
    language: "TypeScript",
  },
  {
    id: 2,
    name: "LearnStack",
    description: "Comprehensive e-learning ecosystem with collaboration & hackathons",
    html_url: "https://github.com/riddheshsoni2008/LearnStack",
    stars: 1,
    forks: 0,
    language: "TypeScript",
  },
  {
    id: 3,
    name: "resumebuilder",
    description: "AI-powered resume builder and ATS compliance scanner with instant feedback",
    html_url: "https://github.com/riddheshsoni2008/resumebuilder",
    stars: 0,
    forks: 0,
    language: "JavaScript",
  },
  {
    id: 4,
    name: "hotelmanagement",
    description: "Full-stack hotel and reservation management software architecture",
    html_url: "https://github.com/riddheshsoni2008/hotelmanagement",
    stars: 1,
    forks: 0,
    language: "TypeScript",
  },
];

export default function GithubActivity() {
  const [paletteKey, setPaletteKey] = useState("emerald");
  const [data, setData] = useState({
    user: {
      login: "riddheshsoni2008",
      name: "Riddhesh soni",
      avatar_url: "https://avatars.githubusercontent.com/u/225166242?v=4",
      html_url: "https://github.com/riddheshsoni2008",
      bio: "Full-Stack Developer | MERN & Next.js Specialist",
      public_repos: 23,
      followers: 7,
      following: 2,
      hireable: true,
    },
    stats: {
      totalContributions: fallbackContribData?.total?.lastYear || 538,
      maxStreak: 5,
      currentStreak: 0,
      activeDaysCount: 48,
      publicRepos: 23,
      followers: 7,
      following: 2,
      totalStars: 2,
      totalForks: 0,
    },
    contributions: fallbackContribData?.contributions || [],
    featuredRepos: INITIAL_REPOS,
  });

  const [loading, setLoading] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const calendarScrollRef = useRef(null);

  // Fetch live GitHub data
  useEffect(() => {
    let isMounted = true;
    async function fetchGithubData() {
      try {
        setLoading(true);
        const res = await fetch("/api/github");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json?.user) {
            setData((prev) => ({
              ...prev,
              user: json.user,
              stats: json.stats || prev.stats,
              contributions:
                json.contributions?.length > 0
                  ? json.contributions
                  : prev.contributions,
              featuredRepos:
                json.featuredRepos?.length > 0
                  ? json.featuredRepos
                  : prev.featuredRepos,
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load GitHub activity:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGithubData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Format contributions into 53 weeks of 7 days
  const { weeks, monthHeaders } = useMemo(() => {
    const rawList = data.contributions || [];
    if (!rawList.length) return { weeks: [], monthHeaders: [] };

    const groupedWeeks = [];
    for (let i = 0; i < rawList.length; i += 7) {
      groupedWeeks.push(rawList.slice(i, i + 7));
    }

    const headers = [];
    let lastMonth = -1;
    groupedWeeks.forEach((week, wIdx) => {
      if (week[0]?.date) {
        // Parse date reliably without timezone shift
        const [year, month] = week[0].date.split("-").map(Number);
        const mIdx = month - 1;
        if (mIdx !== lastMonth) {
          headers.push({ weekIndex: wIdx, label: MONTH_NAMES[mIdx] });
          lastMonth = mIdx;
        }
      }
    });

    return { weeks: groupedWeeks, monthHeaders: headers };
  }, [data.contributions]);

  // Handle square hover
  const handleMouseEnter = (day, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = calendarScrollRef.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };
    setTooltipPos({
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.top - parentRect.top - 8,
    });
    setHoveredDay(day);
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  const currentPalette = PALETTES[paletteKey] || PALETTES.emerald;

  // Format date readable
  const formatReadableDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="github" className="relative py-24 md:py-32 bg-[var(--color-surface)] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] relative z-10">
        {/* Section Header */}
        <SectionHeader number="04." title="OpenSource" />

        {/* Section Intro Subtitle */}
        <div className="mb-12">
          <p className="font-mono text-xs sm:text-sm md:text-base text-gray-500">
            <span className="text-[#C678DD]">const</span>{" "}
            <span className="text-[#61DAFB]">githubActivity</span>{" "}
            <span className="text-gray-400">=</span>{" "}
            <span className="text-[#98C379]">await</span>{" "}
            <span className="text-[#61DAFB]">fetch</span>
            <span className="text-gray-400">(</span>
            <span className="text-[#98C379]">"https://api.github.com/users/riddheshsoni2008"</span>
            <span className="text-gray-400">);</span>
          </p>
        </div>

        {/* Top Profile & Identity Card */}
        <div className="bg-[#0D1117] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-8 relative overflow-hidden group">
          {/* Subtle gradient glow behind profile */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-emerald-500/10" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            {/* Avatar & User Details */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-emerald-500/40 p-0.5 bg-[#161B22] shadow-lg">
                  <img
                    src={data.user.avatar_url}
                    alt={data.user.name}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                {/* Available for hire pulse indicator */}
                <div
                  className="absolute -bottom-1 -right-1 bg-[#161B22] border border-gray-800 rounded-full p-1 shadow-md"
                  title="Available for collaboration"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {data.user.name}
                  </h3>
                  <a
                    href={data.user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs md:text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    @{data.user.login}
                  </a>
                </div>

                <p className="text-gray-400 text-sm md:text-base mt-1.5 flex items-center gap-2">
                  <span className="text-emerald-400">●</span> {data.user.bio}
                </p>

                <div className="flex items-center gap-4 mt-3 font-mono text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open to Work</span>
                  </span>
                  <span>•</span>
                  <span>{data.user.followers} Followers</span>
                  <span>•</span>
                  <span>{data.user.following} Following</span>
                </div>
              </div>
            </div>

            {/* Profile CTA Button */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={data.user.html_url}
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#21262D] hover:bg-[#30363D] text-white border border-gray-700 hover:border-gray-600 font-mono text-xs md:text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 group/btn"
              >
                {/* GitHub Octocat SVG */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Card 1: Total Contributions */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0D1117] border border-gray-800 rounded-xl p-5 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-gray-400 mb-3">
              <span className="font-mono text-xs uppercase tracking-wider">Yearly Commits</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <GitCommit className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {data.stats.totalContributions}
              <span className="text-emerald-400 text-lg sm:text-xl font-bold ml-1">+</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-mono">Last 12 months activity</p>
          </motion.div>

          {/* Card 2: Streak */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0D1117] border border-gray-800 rounded-xl p-5 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-gray-400 mb-3">
              <span className="font-mono text-xs uppercase tracking-wider">Max Streak</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {data.stats.maxStreak}
              <span className="text-amber-400 text-xs font-semibold ml-2">Days</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              {data.stats.activeDaysCount} active commit days
            </p>
          </motion.div>

          {/* Card 3: Public Repositories */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0D1117] border border-gray-800 rounded-xl p-5 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-gray-400 mb-3">
              <span className="font-mono text-xs uppercase tracking-wider">Public Repos</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <GitBranch className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {data.stats.publicRepos}
              <span className="text-blue-400 text-lg sm:text-xl font-bold ml-1">+</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-mono">Full-stack & UI projects</p>
          </motion.div>

          {/* Card 4: Stars & Engagement */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0D1117] border border-gray-800 rounded-xl p-5 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-gray-400 mb-3">
              <span className="font-mono text-xs uppercase tracking-wider">Repo Stars</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Star className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {data.stats.totalStars}
              <span className="text-purple-400 text-xs font-semibold ml-2">Earned</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-mono">Open source community</p>
          </motion.div>
        </div>

        {/* CONTRIBUTION BOARD CONTAINER */}
        <div className="bg-[#0D1117] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-8 relative">
          {/* Terminal Title Bar & Palette Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="font-mono text-xs text-gray-400 flex items-center gap-2">
                <span>riddheshsoni2008</span>
                <span className="text-gray-600">/</span>
                <span className="text-emerald-400 font-semibold">contribution-graph</span>
              </div>
            </div>

            {/* Live Palette Selector */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-500 hidden sm:inline">Theme:</span>
              <div className="flex items-center gap-1.5 bg-[#161B22] border border-gray-800 rounded-lg p-1">
                {Object.entries(PALETTES).map(([key, pal]) => (
                  <button
                    key={key}
                    onClick={() => setPaletteKey(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                      paletteKey === key
                        ? "bg-[#21262D] text-white shadow-sm font-semibold border border-gray-700"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: pal.indicator }}
                    />
                    <span>{pal.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Heatmap Wrapper */}
          <div className="relative">
            {/* Horizontal Scroll Hint on Mobile */}
            <div className="md:hidden flex items-center justify-between text-xs text-gray-400 font-mono mb-3">
              <span className="flex items-center gap-1">
                <span>←</span> Swipe to scroll year <span>→</span>
              </span>
              <span className="text-emerald-400 font-semibold">
                {data.stats.totalContributions} Contributions
              </span>
            </div>

            {/* Scrollable Heatmap Grid */}
            <div
              ref={calendarScrollRef}
              className="overflow-x-auto pb-4 relative custom-scrollbar select-none"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#30363D #0D1117",
              }}
            >
              <div className="inline-block min-w-max">
                {/* Month Headers */}
                <div className="flex text-[11px] font-mono text-gray-400 mb-2 pl-8">
                  {weeks.map((_, wIdx) => {
                    const header = monthHeaders.find((h) => h.weekIndex === wIdx);
                    return (
                      <div
                        key={wIdx}
                        className="w-[15px] shrink-0 text-left"
                      >
                        {header ? header.label : ""}
                      </div>
                    );
                  })}
                </div>

                {/* Grid: Day labels on left + 7 rows */}
                <div className="flex">
                  {/* Day of Week Labels (Mon, Wed, Fri) */}
                  <div className="flex flex-col justify-between text-[10px] font-mono text-gray-500 pr-2 h-[105px] py-0.5">
                    <span className="opacity-0">Sun</span>
                    <span>Mon</span>
                    <span className="opacity-0">Tue</span>
                    <span>Wed</span>
                    <span className="opacity-0">Thu</span>
                    <span>Fri</span>
                    <span className="opacity-0">Sat</span>
                  </div>

                  {/* 53 Columns of Weeks */}
                  <div className="flex gap-[3.5px]">
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-[3.5px]">
                        {week.map((day) => {
                          const level = day?.level ?? 0;
                          const levelClass =
                            currentPalette.levels[level] ||
                            currentPalette.levels[0];

                          return (
                            <motion.div
                              key={day.date}
                              whileHover={{ scale: 1.35, zIndex: 30 }}
                              transition={{ duration: 0.15 }}
                              onMouseEnter={(e) => handleMouseEnter(day, e)}
                              onMouseLeave={handleMouseLeave}
                              className={`w-[11.5px] h-[11.5px] rounded-[2.5px] border transition-colors duration-150 cursor-pointer ${levelClass}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Tooltip */}
              <AnimatePresence>
                {hoveredDay && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute pointer-events-none z-50 bg-[#161B22] text-white border border-gray-700 shadow-2xl rounded-lg px-3 py-1.5 font-mono text-xs whitespace-nowrap -translate-x-1/2 -translate-y-full"
                    style={{
                      left: tooltipPos.x,
                      top: tooltipPos.y,
                    }}
                  >
                    <div className="font-semibold text-white">
                      {hoveredDay.count > 0 ? (
                        <span className="text-emerald-400 font-bold">
                          {hoveredDay.count} contribution{hoveredDay.count > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-gray-400">No contributions</span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {formatReadableDate(hoveredDay.date)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Board Footer & Legend */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-800 font-mono text-xs text-gray-400 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-300 font-semibold">
                  {data.stats.totalContributions} contributions
                </span>
                <span>in the last year</span>
              </div>

              {/* Color Intensity Scale Legend */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Less</span>
                <div className="flex gap-1 items-center">
                  {currentPalette.levels.map((cls, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-[2px] border ${cls}`}
                      title={`Level ${i}`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">More</span>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURED GITHUB REPOSITORIES */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-mono text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Active Repositories & Open Source</span>
            </h4>
            <a
              href={`${data.user.html_url}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group"
            >
              <span>View all ({data.user.public_repos})</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.featuredRepos.slice(0, 4).map((repo) => {
              const langColor =
                LANG_COLORS[repo.language] || LANG_COLORS.default;
              return (
                <motion.a
                  key={repo.id || repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, borderColor: "rgba(59, 130, 246, 0.4)" }}
                  className="bg-[#0D1117] border border-gray-800 rounded-xl p-5 shadow-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <GitBranch className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-emerald-400 transition-colors" />
                        <span className="font-mono text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                          {repo.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700 shrink-0">
                        Public
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm line-clamp-2 mb-4 leading-relaxed font-sans">
                      {repo.description || "Open source project on GitHub"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-800/80 font-mono text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: langColor }}
                      />
                      <span>{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-white transition-colors">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="flex items-center gap-1 hover:text-white transition-colors">
                        <GitFork className="w-3.5 h-3.5 text-gray-400" />
                        <span>{repo.forks}</span>
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
