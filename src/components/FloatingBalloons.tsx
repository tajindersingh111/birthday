"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface Balloon {
  id: string;
  x: number; // Left percentage (5% to 90%)
  size: number; // Width in px (45 to 65)
  color: string; // Gradient class
  delay: number;
  duration: number;
  message: string;
}

interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
}

const MESSAGES = [
  "Tajji loves you! ❤️",
  "My Handsome Boy 👑",
  "Always Yours 💍",
  "My World 🌎",
  "My Smile 😊",
  "My Safe Place 🏡",
  "You are my favorite! ✨",
  "Happy 22nd, Love! 🎂",
  "Hugs & Kisses 💋",
  "My Happiness 🌸"
];

const COLORS = [
  "from-pink-500/70 to-rose-400/60",
  "from-rose-500/70 to-pink-400/60",
  "from-purple-500/70 to-indigo-400/60",
  "from-pink-600/70 to-purple-400/60",
  "from-rose-600/70 to-rose-400/60"
];

export function FloatingBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [popTexts, setPopTexts] = useState<FloatingText[]>([]);

  // Spawn balloons periodically
  useEffect(() => {
    // Initial batch
    const initialBalloons = Array.from({ length: 5 }).map((_, i) => createBalloon(i.toString()));
    setBalloons(initialBalloons);

    // Spawn cycle
    const interval = setInterval(() => {
      setBalloons((prev) => {
        // Keep a maximum of 8 active balloons to prevent crowding
        if (prev.length >= 8) return prev;
        return [...prev, createBalloon(Date.now().toString())];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const createBalloon = (id: string): Balloon => {
    const x = Math.random() * 85 + 5; // 5% to 90%
    const size = Math.random() * 20 + 45; // 45px to 65px
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const duration = Math.random() * 5 + 8; // 8s to 13s to rise
    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

    return {
      id,
      x,
      size,
      color,
      delay: Math.random() * 2,
      duration,
      message,
    };
  };

  const handlePop = (balloon: Balloon, clientX: number, clientY: number) => {
    // 1. Confetti pop effect at touch coordinates
    const xRatio = clientX / window.innerWidth;
    const yRatio = clientY / window.innerHeight;

    confetti({
      particleCount: 15,
      spread: 60,
      origin: { x: xRatio, y: yRatio },
      colors: ["#ec4899", "#f43f5e", "#d946ef", "#a855f7"],
    });

    // 2. Add floating pop-up text
    const newText: FloatingText = {
      id: `text-${Date.now()}-${Math.random()}`,
      x: clientX,
      y: clientY - 30,
      text: balloon.message
    };
    setPopTexts((prev) => [...prev, newText]);

    // Remove popped balloon
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));

    // Cleanup floating text after 1.5s
    setTimeout(() => {
      setPopTexts((prev) => prev.filter((t) => t.id !== newText.id));
    }, 1500);
  };

  // Re-spawn if balloon drifts off screen without being popped
  const handleComplete = (id: string) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none">
      {/* 1. Active Balloons */}
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: "110vh", x: `${b.x}vw`, opacity: 0 }}
            animate={{ y: "-15vh", opacity: [0, 1, 1, 0.8] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              ease: "linear"
            }}
            onAnimationComplete={() => handleComplete(b.id)}
            className="absolute pointer-events-auto cursor-pointer"
            style={{ width: b.size, height: b.size * 1.3 }}
            onClick={(e) => handlePop(b, e.clientX, e.clientY)}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              handlePop(b, touch.clientX, touch.clientY);
            }}
          >
            {/* Balloon Body */}
            <div
              className={`w-full h-full rounded-t-full rounded-b-[45%] bg-gradient-to-t ${b.color} border border-white/10 relative shadow-[inset_-3px_-5px_8px_rgba(0,0,0,0.2),0_10px_20px_rgba(244,63,94,0.15)]`}
            >
              {/* Highlight shine */}
              <div className="absolute top-2 left-3 w-3 h-6 bg-white/25 rounded-full rotate-12"></div>
              
              {/* Knot bottom triangle */}
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-rose-500/40"></div>
              
              {/* String line */}
              <div className="absolute bottom-[-34px] left-1/2 -translate-x-1/2 w-[1px] h-8 bg-white/20"></div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 2. Floating Pop Texts */}
      <AnimatePresence>
        {popTexts.map((pt) => (
          <motion.div
            key={pt.id}
            initial={{ opacity: 0, y: pt.y, x: pt.x - 75, scale: 0.8 }}
            animate={{ opacity: 1, y: pt.y - 120, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute z-50 pointer-events-none px-4 py-2 rounded-xl bg-zinc-950/80 border border-pink-500/30 text-pink-400 font-semibold text-xs sm:text-sm tracking-wider text-center shadow-[0_4px_15px_rgba(244,63,94,0.25)] backdrop-blur-md whitespace-nowrap"
            style={{ left: pt.x, top: pt.y }}
          >
            {pt.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
