import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const project = searchParams.get("project");

  if (!project) {
    return new NextResponse("Project parameter is required", { status: 400 });
  }

  const brainDir =
    "/home/riddhesh/.gemini/antigravity/brain/438eecf4-2d6e-419e-aef2-f74c3971f30c";

  try {
    const files = fs.readdirSync(brainDir);
    let matchedFiles = [];

    for (const file of files) {
      if (file.startsWith(project) && file.endsWith(".webp")) {
        matchedFiles.push(file);
      }
    }

    if (matchedFiles.length === 0) {
      return new NextResponse("Video not found", { status: 404 });
    }

    // Sort by modified time descending to get the newest recording
    matchedFiles.sort((a, b) => {
      return (
        fs.statSync(path.join(brainDir, b)).mtimeMs -
        fs.statSync(path.join(brainDir, a)).mtimeMs
      );
    });

    const targetFile = matchedFiles[0];

    const filePath = path.join(brainDir, targetFile);
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error serving video:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
