"use client";

import { motion } from "framer-motion";
import { Disc, Music4, Play, Pause, Disc3 } from "lucide-react";
import Image from "next/image";

interface MusicProps {
  isPlaying: boolean;
  isLoaded: boolean;
  onToggle: () => void;
}

export function Music({ isPlaying, isLoaded, onToggle }: MusicProps) {
  return (
    <section id="music-section" className="relative min-h-[70vh] py-24 px-4 bg-black overflow-hidden flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-950/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative w-full max-w-4xl z-10">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-pink-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-10"
        >
          {/* Decorative Vinyl Record */}
          <div className="flex flex-col items-center gap-4 w-full md:w-1/3 shrink-0">
            <div className="relative w-48 h-48 select-none">
              {/* Outer Vinyl ring shadow */}
              <div className="absolute inset-0 rounded-full bg-pink-500/5 blur-lg scale-110"></div>
              
              {/* Vinyl Disk */}
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="w-full h-full rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 p-2 flex items-center justify-center relative shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              >
                {/* Vinyl Grooves */}
                <div className="absolute inset-4 rounded-full border border-zinc-800/40"></div>
                <div className="absolute inset-8 rounded-full border border-zinc-800/60"></div>
                <div className="absolute inset-12 rounded-full border border-zinc-800/40"></div>
                <div className="absolute inset-16 rounded-full border border-zinc-800/60"></div>

                {/* Album Cover inside disk */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden border border-black shadow-[inset_0_0_10px_rgba(0,0,0,0.6)]">
                  <Image
                    src="/photos/WhatsApp Image 2026-07-09 at 4.46.00 PM (2).jpeg"
                    alt="Album Cover"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  
                  {/* Center Spindle Hole */}
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-black border border-zinc-700 z-10 shadow-[0_0_4px_rgba(0,0,0,0.8)]"></div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Custom Local Player Frame */}
          <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Music4 className="w-5 h-5 text-pink-500 animate-pulse" />
                <span className="text-xs font-semibold text-pink-500/80 tracking-widest uppercase">
                  Our Soundtrack
                </span>
              </div>
              <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-white mb-2">
                Birthday Song
              </h2>
              <p className="text-pink-400/80 text-sm font-semibold tracking-wide mb-4 font-['Poppins',sans-serif]">
                Jordan Sandhu
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-['Poppins',sans-serif]">
                Press play below to listen to a special birthday track selected just for you while you check out our memories together.
              </p>
            </div>

            {/* Custom Control Panel */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-black/40 shadow-inner flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Disc3 className={`w-8 h-8 text-pink-500 ${isPlaying ? 'animate-spin [animation-duration:3s]' : ''}`} />
                  <div>
                    <h4 className="text-sm font-semibold text-white">jordan-sandhu-birthday.mp3</h4>
                    <span className="text-[10px] text-gray-500">Local Audio Track</span>
                  </div>
                </div>

                {/* Main Play Toggle */}
                <button
                  onClick={onToggle}
                  disabled={!isLoaded}
                  className="w-12 h-12 rounded-full bg-pink-600 hover:bg-pink-500 hover:scale-105 active:scale-95 transition-all text-white flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-white translate-x-[1px]" />
                  )}
                </button>
              </div>

              {/* Glowing Wave Visualizer (Dancing when playing) */}
              <div className="h-10 w-full flex items-center justify-center gap-[3px] bg-zinc-950/40 rounded-xl px-4 border border-zinc-900/50">
                {isPlaying ? (
                  Array.from({ length: 40 }).map((_, i) => {
                    const height = [40, 20, 60, 30, 80, 50, 70, 25, 90, 45][i % 10];
                    const duration = 0.5 + (i % 5) * 0.15;
                    return (
                      <motion.div
                        key={i}
                        className="w-[3px] bg-pink-500/80 rounded-full"
                        style={{ height: `${height}%` }}
                        animate={{ height: ["15%", `${height}%`, "15%"] }}
                        transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
                      />
                    );
                  })
                ) : (
                  <div className="text-xs text-gray-500 font-medium">Player paused</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
