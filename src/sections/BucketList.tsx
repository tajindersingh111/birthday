"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ClipboardList } from "lucide-react";
import { BucketItem } from "@/config/birthday";

interface BucketListProps {
  initialItems: BucketItem[];
}

export function BucketList({ initialItems }: BucketListProps) {
  const [items, setItems] = useState<BucketItem[]>(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <section id="future-bucket-list" className="relative min-h-[80vh] py-24 px-4 bg-zinc-950/20 overflow-hidden flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-pink-900/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative w-full max-w-2xl z-10">
        {/* Main Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-pink-500/10 relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-12 h-12 rounded-full border border-pink-500/20 bg-black/40 flex items-center justify-center mb-4 mx-auto text-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.1)]"
            >
              <ClipboardList size={20} className="animate-pulse" />
            </motion.div>
            
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-white mb-3">
              Our Future Bucket List
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-['Poppins',sans-serif]">
              Adventures and dreams waiting to be fulfilled
            </p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-4"></div>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-4">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => toggleItem(item.id)}
                className="flex items-center gap-4 p-4 rounded-xl border border-zinc-900 bg-black/20 hover:bg-pink-500/5 hover:border-pink-500/20 transition-all duration-300 cursor-pointer group select-none"
              >
                {/* Custom animated checkbox */}
                <div className="relative flex items-center justify-center w-6 h-6 rounded-lg border-2 border-pink-500/40 bg-zinc-950 group-hover:border-pink-500/70 transition-all duration-300 overflow-hidden shrink-0">
                  {/* Glowing background inside box on complete */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-pink-600 to-rose-600 rounded-[6px]"
                    initial={false}
                    animate={{ scale: item.completed ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />

                  {/* Draw checkmark path */}
                  <svg
                    className="w-4 h-4 text-white z-10 stroke-current fill-none stroke-[3]"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      d="M20 6L9 17L4 12"
                      initial={false}
                      animate={{ pathLength: item.completed ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </svg>
                </div>

                {/* Checklist item text with animated line through */}
                <div className="relative flex-1">
                  <span
                    className={`font-['Poppins',sans-serif] text-sm sm:text-base transition-colors duration-300 font-medium ${
                      item.completed ? "text-gray-500 font-normal" : "text-gray-200"
                    }`}
                  >
                    {item.text}
                  </span>

                  {/* Red/pink line-through overlay */}
                  <motion.div
                    className="absolute top-1/2 left-0 h-[2px] bg-pink-500/50 rounded-full"
                    initial={false}
                    animate={{ width: item.completed ? "100%" : "0%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
