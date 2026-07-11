"use client";

import { motion } from "framer-motion";
import { 
  GitBranch, 
  RefreshCw, 
  Check, 
  Radio, 
  AlertCircle 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: "github", 
      url: "https://github.com/riddheshsoni2008", 
      username: "riddheshsoni2008", 
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ) 
    },
    {  
      name: "linkedin", 
      url: "https://www.linkedin.com/in/riddhesh-soni-32a94a336/", 
      username: "riddhesh-soni", 
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ) 
    },
    { 
      name: "instagram", 
      url: "https://www.instagram.com/riddhesh_soni_08/", 
      username: "riddhesh_soni_08", 
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ) 
    },
  ];

  return (
    <footer className="relative bg-[#080B10] border-t border-gray-800/80 overflow-hidden font-mono pt-12">
      {/* Glow Effects */}
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 pb-6">
        {/* Layer 1: Code Block & Social CLI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Left: JSON Config */}
          <div className="bg-[#0D1117] border border-gray-800 rounded-xl p-5 shadow-2xl relative overflow-hidden group">
            {/* Top Dot Buttons */}
            <div className="flex gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 round ed-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 space-y-1.5 leading-relaxed">
              <div>
                <span className="text-[#C678DD]">const</span> <span className="text-[#61DAFB]">developer</span> = <span className="text-white">{'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-[#E06C75]">name</span>: <span className="text-[#98C379]">&quot;Riddhesh Soni&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#E06C75]">status</span>: <span className="text-[#98C379]">&quot;Cooking next-gen web apps&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#E06C75]">caffeineLevel</span>: <span className="text-[#D19A66]">100</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#E06C75]">music</span>: <span className="text-[#98C379]">&quot;Lo-Fi Chill Beats&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#E06C75]">errors</span>: <span className="text-[#D19A66]">0</span> <span className="text-gray-500">// sheesh!</span>
              </div>
              <div>
                <span className="text-white">{'}'}</span>;
              </div>
            </div>
          </div>

          {/* Right: CLI Commands as Social Links */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
                <span className="text-[#28C840]">&gt;</span> terminal.connect()
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Run these commands or click the links below to check my social hubs.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6, color: "#61DAFB" }}
                  className="flex items-center gap-3 text-xs text-gray-400 group cursor-pointer w-fit"
                >
                  <span className="text-gray-400 font-bold shrink-0">$ curl -I</span>
                  <span className="bg-[#161B22] border border-gray-800 px-2 py-1 rounded text-[#79C0FF] group-hover:border-[#61DAFB]/40 transition-colors duration-200">
                    {social.name}
                  </span>
                  <span className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
                    {social.icon} <span>visit()</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800/80 mb-6" />

        {/* Copyright info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="flex items-center gap-1.5">
            Designed & built with 💙 by <span className="text-[#61DAFB] font-semibold">Riddhesh</span>
          </p>
          <p>© {currentYear} — All rights reserved</p>
        </div>
      </div>

      {/* Layer 3: VS Code bottom status bar */}
      <div className="w-full bg-[#1A1F29] border-t border-gray-800/60 text-[10px] md:text-xs text-gray-400 px-4 py-1.5 flex items-center justify-between select-none">
        {/* Left indicators */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Branch status */}
          <div className="flex items-center gap-1 hover:text-[#61DAFB] transition-colors cursor-pointer group">
            <GitBranch className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform duration-200" />
            <span className="font-semibold">main</span>
          </div>

          {/* Sync indicator */}
          <div className="flex items-center gap-1 hover:text-[#61DAFB] transition-colors cursor-pointer group">
            <RefreshCw className="w-3 h-3 text-gray-500 group-hover:animate-spin" />
          </div>

          {/* Error and warnings count */}
          <div className="flex items-center gap-2 text-gray-400 cursor-pointer">
            <span className="text-red-400 font-bold flex items-center gap-0.5">
              <AlertCircle className="w-3 h-3" /> 0
            </span>
            <span className="text-yellow-400 font-bold flex items-center gap-0.5">
              <span>⚠</span> 0
            </span>
          </div>
        </div>

        {/* Middle text */}
        <div className="hidden sm:flex items-center gap-1.5 text-gray-500 font-mono text-[9px] md:text-[11px]">
          <span>status:</span>
          <span className="text-green-400">deployed_successfully</span>
        </div>

        {/* Right indicators */}
        <div className="flex items-center gap-3 md:gap-4 text-gray-500">
          <span className="hover:text-gray-300 cursor-pointer">UTF-8</span>
          <span className="hover:text-gray-300 cursor-pointer hidden md:inline">JavaScript React</span>
          <div className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors cursor-pointer">
            <Check className="w-3.5 h-3.5" />
            <span>Prettier</span>
          </div>
          {/* Radio Tower / Latency ping */}
          <div className="flex items-center gap-1 hover:text-gray-300 cursor-pointer group">
            <Radio className="w-3.5 h-3.5 text-blue-400 group-hover:animate-pulse" />
            <span className="text-[9px] text-green-500 font-bold">● Live</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
