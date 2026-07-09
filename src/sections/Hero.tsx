"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import gsap from "gsap";

interface HeroProps {
  onOpenHeart: () => void;
  nickname: string;
  age: number;
}

export function Hero({ onOpenHeart, nickname, age }: HeroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);

  const fullLoadingText = "Loading your surprise...";

  // Typing effect for loading screen
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText((prev) => prev + fullLoadingText.charAt(index));
      index++;
      if (index >= fullLoadingText.length) {
        clearInterval(interval);
      }
    }, 100);

    // Stop loading after 4.5 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // GSAP animation for hero entrance when loading completes
  useEffect(() => {
    if (!isLoading && heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".animate-fade-in",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: "power3.out",
          }
        );
      }, heroRef.current);

      return () => ctx.revert();
    }
  }, [isLoading]);

  // Generate random twinkling stars
  useEffect(() => {
    if (!isLoading && starsContainerRef.current) {
      const container = starsContainerRef.current;
      container.innerHTML = ""; // Clear
      const starCount = 80;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        // Random styles
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1; // 1px to 3px
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 3;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animation = `stars-fade ${duration}s ease-in-out infinite`;
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
      }
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none">
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* Loading Screen */
          <motion.div
            key="loader"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Spinning rose gold loader */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-t-2 border-pink-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-rose-500/50 animate-spin [animation-direction:reverse]"></div>
                <span className="text-xl">❤️</span>
              </div>
              
              {/* Typewriter message */}
              <p className="font-['Poppins',sans-serif] text-sm text-pink-500/80 tracking-widest uppercase h-6">
                {loadingText}
                <span className="animate-ping">|</span>
              </p>
            </div>
          </motion.div>
        ) : (
          /* Hero Section */
          <motion.div
            key="hero"
            ref={heroRef}
            className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Stars Container */}
            <div
              ref={starsContainerRef}
              className="absolute inset-0 pointer-events-none opacity-50 z-0"
            />

            {/* Background Hero Image */}
            <div className="absolute inset-0 z-0 opacity-[0.65] pointer-events-none overflow-hidden">
              <Image
                src="/photos/background.jpeg"
                alt="Beautiful Background"
                fill
                priority
                className="object-cover filter brightness-[0.7] contrast-[1.1] md:object-[68%_center]"
              />
              {/* Fade out background left side on desktop for text clarity */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent opacity-90 pointer-events-none z-0"></div>
            </div>

            {/* Glowing Auroras */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-rose-600/10 rounded-full blur-[100px] animate-pulse-slow [animation-delay:1.5s]"></div>
            </div>

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto w-full flex flex-col items-center md:items-start justify-center gap-6 z-10 px-6 sm:px-12 md:pl-20">
              {/* Luxury Typography Treatment for Happy 22nd Birthday */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none select-none text-center md:text-left mb-1"
              >
                <span className="block text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Happy {age}nd
                </span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 font-normal drop-shadow-[0_0_15px_rgba(236,72,153,0.2)] mt-1">
                  Birthday <Sparkles className="w-4 h-4 text-pink-400 animate-pulse inline-block align-middle ml-1" />
                </span>
              </motion.h1>

              {/* Luxury Typography Treatment for nickname */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-['Playfair_Display',serif] text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight select-none text-center md:text-left"
              >
                <span className="block text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                  Beautiful
                </span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 font-normal drop-shadow-[0_0_20px_rgba(236,72,153,0.3)] mt-2">
                  Girl <span className="not-italic text-red-500 text-4xl sm:text-6xl md:text-7xl animate-pulse inline-block align-middle">❤️</span>
                </span>
              </motion.h2>

              <p className="animate-fade-in font-['Playfair_Display',serif] text-lg sm:text-2xl text-rose-100/70 italic max-w-lg mt-2 text-center md:text-left">
                &ldquo;Today is all about you.&rdquo;
              </p>

              {/* Glowing CTA Button */}
              <motion.button
                onClick={onOpenHeart}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(244,63,94,0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="animate-fade-in mt-10 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-full font-medium tracking-wide flex items-center gap-3 border border-pink-400/30 shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all duration-300 cursor-pointer"
              >
                <span>Open My Heart</span>
                <span className="text-lg">❤️</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
