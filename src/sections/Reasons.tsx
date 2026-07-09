"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, RefreshCw } from "lucide-react";
import Image from "next/image";
import { FlipCard } from "@/components/FlipCard";

interface ReasonsProps {
  reasons: string[];
}

export function Reasons({ reasons }: ReasonsProps) {
  // Store reason objects containing the original reason text, a stable key, and individual flipped state
  const [cards, setCards] = useState(() =>
    reasons.map((reason, index) => ({
      id: `reason-${index}`,
      originalIndex: index,
      text: reason,
      isFlipped: false,
    }))
  );

  // Toggle individual card flipping state
  const handleFlipCard = (id: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  // Shuffle card order and reset flipped state
  const handleShuffle = () => {
    setCards((prev) => {
      // First reset all flips
      const resetFlips = prev.map((card) => ({ ...card, isFlipped: false }));
      
      // Shuffle resetting elements
      const shuffled = [...resetFlips];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  // Reset all to original order
  const handleReset = () => {
    setCards(() =>
      reasons.map((reason, index) => ({
        id: `reason-${index}`,
        originalIndex: index,
        text: reason,
        isFlipped: false,
      }))
    );
  };

  return (
    <section id="reasons-i-love-you" className="relative min-h-screen py-24 px-4 bg-black overflow-hidden">
      {/* Background Akshardham Image Watermark */}
      <div className="absolute inset-0 z-0 opacity-[0.55] pointer-events-none overflow-hidden select-none">
        <Image
          src="/photos/WhatsApp Image 2026-07-09 at 4.46.02 PM (2).jpeg"
          alt="Akshardham Memory Background"
          fill
          priority
          className="object-cover filter brightness-[0.75] contrast-[1.1] saturate-[0.85]"
        />
        {/* Vignette fade to black at edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black opacity-95 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black opacity-95 pointer-events-none z-0"></div>
      </div>

      {/* Background neon glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-pink-900/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-rose-900/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Reasons I Love You
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-pink-500 mb-4"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-sm sm:text-base font-['Poppins',sans-serif] max-w-md"
            >
              Here are 25 little things about you that make my world complete. Tap each card to reveal the secret.
            </motion.p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleShuffle}
              className="px-5 py-3 rounded-full border border-pink-500/30 bg-black/40 backdrop-blur-md hover:bg-pink-500/10 text-pink-500 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.15)]"
            >
              <Shuffle size={16} />
              Shuffle Cards
            </button>
            <button
              onClick={handleReset}
              className="p-3 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-md hover:bg-zinc-800 text-gray-400 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Reset Order"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full"
              >
                <FlipCard
                  index={card.originalIndex}
                  text={card.text}
                  isFlipped={card.isFlipped}
                  onFlip={() => handleFlipCard(card.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
