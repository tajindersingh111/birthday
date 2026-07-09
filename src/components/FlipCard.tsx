"use client";

import { motion } from "framer-motion";

interface FlipCardProps {
  index: number;
  text: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlipCard({ index, text, isFlipped, onFlip }: FlipCardProps) {
  return (
    <div 
      className="relative w-full aspect-[4/5] cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={onFlip}
    >
      <motion.div
        className="w-full h-full duration-500"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-black/20 to-pink-950/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:border-pink-500/40 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Card header */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold tracking-widest text-pink-500/70 uppercase">
              Reason #{(index + 1).toString().padStart(2, "0")}
            </span>
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></div>
          </div>

          {/* Heart icon in center */}
          <div className="flex justify-center items-center my-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/20 blur-xl scale-125 rounded-full"></div>
              <span className="text-5xl select-none filter drop-shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse">
                ❤️
              </span>
            </div>
          </div>

          {/* Prompt */}
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">
              Tap to reveal
            </span>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 rounded-2xl border border-rose-500/40 bg-gradient-to-tr from-pink-950/40 to-black/40 backdrop-blur-md shadow-[0_8px_32px_0_rgba(244,63,94,0.25)]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Card Header */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold tracking-widest text-pink-400 uppercase">
              I Love You For
            </span>
            <span className="text-xs font-semibold text-pink-400/60">
              #{(index + 1).toString().padStart(2, "0")}
            </span>
          </div>

          {/* Reason text */}
          <div className="flex justify-center items-center my-auto px-2">
            <p className="font-['Playfair_Display',serif] text-rose-100 text-lg sm:text-xl text-center italic leading-relaxed">
              &ldquo;{text}&rdquo;
            </p>
          </div>

          {/* Back prompt */}
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-widest text-pink-500/50 font-medium">
              Tap to hide
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
