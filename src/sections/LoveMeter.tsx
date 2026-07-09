"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Metric {
  name: string;
  value: number;
}

interface LoveMeterProps {
  metrics: Metric[];
}

export function LoveMeter({ metrics }: LoveMeterProps) {
  // We'll add the "Love" metric to the end of the metrics list manually
  return (
    <section id="love-meter" className="relative min-h-[80vh] py-24 px-4 bg-zinc-950/10 overflow-hidden flex items-center justify-center">
      {/* Background soft pink overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-rose-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative w-full max-w-3xl z-10">
        {/* Card Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-pink-500/10 relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-white mb-3">
              Our Compatibility Meter
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-['Poppins',sans-serif]">
              Measuring the foundations of our relationship
            </p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-4"></div>
          </div>

          {/* Progress Bars Container */}
          <div className="flex flex-col gap-8">
            {/* Standard Metrics */}
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-semibold tracking-wider uppercase text-rose-100">
                  <span>{metric.name}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    {metric.value}%
                  </motion.span>
                </div>
                {/* Track */}
                <div className="h-3 w-full bg-black/60 rounded-full border border-pink-500/10 overflow-hidden p-[2px]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-pink-600 to-rose-600 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  ></motion.div>
                </div>
              </div>
            ))}

            {/* Infinity Love Metric */}
            <div className="flex flex-col gap-2 mt-4 relative">
              <div className="flex justify-between items-center text-sm font-bold tracking-wider uppercase text-pink-500">
                <span className="flex items-center gap-1">
                  Love <Heart size={14} className="fill-pink-500 animate-pulse" />
                </span>
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, type: "spring", stiffness: 100 }}
                  className="flex items-center gap-1 font-['Playfair_Display'] font-bold text-xl normal-case"
                >
                  Infinity <span className="text-xl">❤️</span>
                </motion.span>
              </div>
              {/* Infinite Track */}
              <div className="h-4 w-full bg-black/60 rounded-full border border-pink-500/20 overflow-hidden p-[2px] relative shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                {/* Flowing animated background inside bar to represent infinity */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 relative overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                >
                  {/* Glowing sheen animation */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 h-full skew-x-12"
                  ></motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
