"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Phone, X, Heart, Video } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface SurpriseProps {
  youtubeVideoUrl: string;
  callNumber: string;
  nickname: string;
  triggerHeartRain: () => void;
}

export function Surprise({
  youtubeVideoUrl,
  callNumber,
  nickname,
  triggerHeartRain,
}: SurpriseProps) {
  const [surpriseState, setSurpriseState] = useState<"idle" | "fadeToBlack" | "message" | "video" | "final">("idle");
  const videoIframeRef = useRef<HTMLIFrameElement>(null);

  // Trigger confetti burst effect
  const runConfettiStorm = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleStartSurprise = () => {
    // 1. Confetti & Heart rain
    runConfettiStorm();
    triggerHeartRain();

    // 2. Fade screen to black
    setSurpriseState("fadeToBlack");

    // 3. Show romantic message after 1.5s
    setTimeout(() => {
      setSurpriseState("message");
    }, 1500);

    // 4. Show fullscreen video after 4.5s
    setTimeout(() => {
      setSurpriseState("video");
    }, 5000);
  };

  const handleCloseVideo = () => {
    setSurpriseState("final");
  };

  return (
    <div className="relative">
      {/* 1. Surpise Trigger Screen */}
      {surpriseState === "idle" && (
        <section className="relative min-h-[90vh] py-24 px-4 bg-black overflow-hidden flex flex-col items-center justify-center text-center">
          {/* Neon background circle */}
          <div className="absolute w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="z-10 max-w-xl mx-auto flex flex-col items-center"
          >
            <div className="relative mb-6">
              <span className="text-6xl animate-bounce filter drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] select-none">
                🎁
              </span>
            </div>

            <h2 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-white mb-6">
              There is one last surprise...
            </h2>
            <p className="text-gray-400 font-['Poppins',sans-serif] text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              You&apos;ve looked through our milestones, reasons, and letters. But before we finish, click the button below for a personal message.
            </p>

            <motion.button
              onClick={handleStartSurprise}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold tracking-wider flex items-center gap-3 border border-pink-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all duration-300 cursor-pointer"
            >
              <span>One Last Surprise</span>
              <span>❤️</span>
            </motion.button>
          </motion.div>
        </section>
      )}

      {/* 2. Fullscreen transitions (Fade to black, Love message, Video modal) */}
      <AnimatePresence>
        {(surpriseState === "fadeToBlack" || surpriseState === "message") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
          >
            {surpriseState === "message" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center flex flex-col items-center gap-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-5xl"
                >
                  ❤️
                </motion.div>
                <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl font-bold tracking-wide text-rose-100 leading-snug drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                  I Love You To The Moon And Back
                </h2>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Video Overlay screen */}
        {surpriseState === "video" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md"
          >
            {/* Close button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-6 right-6 p-3 rounded-full border border-pink-500/20 bg-black/60 text-gray-400 hover:text-pink-500 transition-all hover:scale-105 active:scale-95 cursor-pointer z-50 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
            >
              <X size={20} />
            </button>

            {/* Video Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.3)] bg-zinc-950"
            >
              {youtubeVideoUrl.endsWith(".mp4") ? (
                <video
                  src={youtubeVideoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  ref={videoIframeRef}
                  src={youtubeVideoUrl}
                  width="100%"
                  height="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-view"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Final Screen */}
      {surpriseState === "final" && (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 bg-black overflow-hidden select-none">
          {/* Background Red Fort Image Watermark */}
          <div className="absolute inset-0 z-0 opacity-[0.55] pointer-events-none overflow-hidden select-none">
            <Image
              src="/photos/WhatsApp Image 2026-07-09 at 4.46.00.jpeg"
              alt="First and Best Memory Background"
              fill
              priority
              className="object-cover filter brightness-[0.7] contrast-[1.1] saturate-[0.8]"
            />
            {/* Vignette fade to black at edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black opacity-95 pointer-events-none z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-black opacity-95 pointer-events-none z-0"></div>
          </div>

          {/* Stars & Aurora */}
          <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
            <div className="star" style={{ left: "15%", top: "25%", width: "2px", height: "2px", animation: "stars-fade 3s infinite" }}></div>
            <div className="star" style={{ left: "75%", top: "15%", width: "3px", height: "3px", animation: "stars-fade 4s infinite 1s" }}></div>
            <div className="star" style={{ left: "85%", top: "65%", width: "1.5px", height: "1.5px", animation: "stars-fade 5s infinite 2s" }}></div>
            <div className="star" style={{ left: "35%", top: "75%", width: "2px", height: "2px", animation: "stars-fade 3.5s infinite 1.5s" }}></div>
          </div>
          
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-pink-900/10 to-transparent rounded-full blur-[120px]"></div>
          </div>

          {/* Final Message Panel */}
          <div className="z-10 max-w-2xl mx-auto flex flex-col items-center gap-8 mt-16">
            {/* Glowing Circular Couple Photo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-pink-500/30 p-1 bg-black/40 backdrop-blur-md shadow-[0_0_35px_rgba(244,63,94,0.4)] select-none z-10"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/photos/WhatsApp Image 2026-07-09 at 4.46.01 PM (1).jpeg"
                  alt="Our Forever Memory"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col gap-4"
            >
              <span className="font-['Poppins',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.2em] text-pink-500 uppercase">
                Distance is temporary.
              </span>
              <span className="font-['Playfair_Display',serif] text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                You are forever.
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-2 mt-4"
            >
              <h3 className="font-['Playfair_Display',serif] text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 filter drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                Happy Birthday,
              </h3>
              <h4 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl font-bold text-white mt-1">
                {nickname} ❤️
              </h4>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              {/* Glowing Meet Button */}
              <motion.a
                href="https://meet.google.com/yva-qofb-cir"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.7)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-full font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-300 cursor-pointer"
              >
                <Video size={18} className="animate-bounce" />
                <span>Join Me At...</span>
              </motion.a>

              {/* Glowing Call Me Button */}
              <motion.a
                href={`tel:${callNumber}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236,72,153,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black/60 border border-pink-500/30 hover:border-pink-500/60 text-pink-500 hover:text-pink-400 rounded-full font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_15px_rgba(236,72,153,0.15)] backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <Phone size={18} className="animate-pulse" />
                <span>Call Me</span>
              </motion.a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
