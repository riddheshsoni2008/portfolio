import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const brainDir = '/home/riddhesh/.gemini/antigravity/brain/438eecf4-2d6e-419e-aef2-f74c3971f30c';
  const publicDir = path.join(process.cwd(), 'public');
  
  try {
    const files = fs.readdirSync(brainDir);
    const copiedFiles = [];
    
    for (const file of files) {
      if (file.endsWith('.webp')) {
        let finalName = '';
        if (file.startsWith('learnstack')) finalName = 'learnstack_demo.webp';
        else if (file.startsWith('returno')) finalName = 'returno_demo.webp';
        else if (file.startsWith('portfolio')) finalName = 'portfolio_demo.webp';
        else if (file.startsWith('cricket')) finalName = 'cricket_demo.webp'; // Will copy newest due to alphabetical/creation order if we handle properly
        
        // Actually, since there might be multiple crickets, let's group them and copy the newest.
        if (finalName) {
           fs.copyFileSync(path.join(brainDir, file), path.join(publicDir, file));
           copiedFiles.push(file);
        }
      }
    }

    return new NextResponse(`Successfully copied: ${copiedFiles.join(', ')}`, { status: 200 });
  } catch (error) {
    console.error('Error copying videos:', error);
    return new NextResponse('Internal Server Error: ' + error.message, { status: 500 });
  }
}
