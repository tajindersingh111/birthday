"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Sparkles } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface LockScreenProps {
  onUnlock: () => void;
  birthdayDate: string; // ISO string target, e.g. "2026-07-10T00:00:00"
}

export function LockScreen({ onUnlock, birthdayDate }: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [stage, setStage] = useState<"countdown" | "greetings" | "passcode">("countdown");
  const [shake, setShake] = useState(false);
  const [bgHearts, setBgHearts] = useState<{ id: number; left: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      size: Math.random() * 14 + 12, // 12px to 26px
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 7, // 7s to 13s
    }));
    setBgHearts(hearts);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const target = new Date(birthdayDate);

    const updateCountdown = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // If countdown ends, shift to greetings automatically if we're in countdown stage
        setStage((prev) => (prev === "countdown" ? "greetings" : prev));
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
        setStage("countdown");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [birthdayDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim().toLowerCase() === "tajji") {
      // Confetti splash
      const end = Date.now() + 1.5 * 1000;
      const colors = ["#ec4899", "#f43f5e", "#db2777"];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPassword(""); // Clear input on error
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col justify-center items-center px-4 select-none">
      {/* Background glowing effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[10%] left-[10%] w-[250px] h-[250px] bg-purple-900/5 rounded-full blur-[80px]"></div>
      </div>

      {/* Floating background hearts */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {bgHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "110vh", x: `${heart.left}vw`, opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.6, 1, 1, 0.8],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute text-pink-500/60 select-none pointer-events-none drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
            style={{ fontSize: heart.size }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="z-10 w-full max-w-lg flex flex-col items-center text-center">
        
        {/* Animated Icon Header (Lock icon changes to Sparkles during Greeting and Lock on Passcode) */}
        <motion.div
          key={stage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-16 h-16 rounded-full border border-pink-500/20 bg-black/40 backdrop-blur-md flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(236,72,153,0.15)] text-pink-500"
        >
          {stage === "countdown" && <Lock className="w-6 h-6 animate-pulse" />}
          {stage === "greetings" && <Sparkles className="w-6 h-6 animate-bounce" />}
          {stage === "passcode" && <Lock className="w-6 h-6" />}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* STAGE 1: COUNTDOWN */}
          {stage === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-white mb-2">
                Waiting for Your Special Day
              </h1>
              <p className="text-gray-400 font-['Poppins',sans-serif] text-xs uppercase tracking-widest mb-6">
                Countdown to July 10th
              </p>

              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm mx-auto">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="bg-zinc-950/60 border border-zinc-900 p-3 sm:p-4 rounded-xl flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] text-pink-500 tabular-nums">
                      {item.value.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STAGE 2: HAPPY BIRTHDAY GREETING SCREEN */}
          {stage === "greetings" && (
            <motion.div
              key="greetings"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center mb-4"
            >
              {/* Princess Portrait Frame */}
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-pink-500/30 p-1.5 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.35)] mb-6 animate-pulse">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/photos/WhatsApp Image 2026-07-09 at 4.45.18 PM.jpeg"
                    alt="My Princess"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white mb-2">
                Happy Birthday,
              </h1>
              <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-4xl italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)] mb-10">
                My Princess <span className="not-italic text-red-500 align-middle inline-block animate-bounce">👑❤️</span>
              </h2>

              <motion.button
                onClick={() => setStage("passcode")}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236,72,153,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold tracking-widest uppercase text-xs flex items-center gap-2 border border-pink-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)] cursor-pointer transition-all duration-300"
              >
                <span>Reveal My Present</span>
                <span>🎁</span>
              </motion.button>
            </motion.div>
          )}

          {/* STAGE 3: PASSCODE LOCK SYSTEM */}
          {stage === "passcode" && (
            <motion.div
              key="passcode"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm flex flex-col items-center"
            >
              <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white mb-2">
                Unlock Surprise Present
              </h2>
              <p className="text-gray-400 font-['Poppins',sans-serif] text-xs uppercase tracking-widest mb-8">
                Enter secret passcode to proceed
              </p>

              <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError(false);
                      }}
                      autoFocus
                      placeholder="Enter Secret Passcode..."
                      className="w-full px-6 py-4 bg-zinc-950/60 border border-zinc-800 rounded-full focus:outline-none focus:border-pink-500/60 text-white placeholder-gray-600 text-center font-['Poppins',sans-serif] tracking-wider text-sm transition-colors duration-300 backdrop-blur-md"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600">
                      <Lock size={16} />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 border border-pink-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)] cursor-pointer transition-all duration-300"
                  >
                    <Unlock size={14} />
                    <span>Open Vault</span>
                  </motion.button>
                </form>

                {/* Hint/Error displays */}
                <AnimatePresence mode="wait">
                  {error ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-rose-500 mt-4 font-['Poppins'] font-medium"
                    >
                      Wrong passcode! Hint: Mani&apos;s favorite name for you... ❤️
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      className="text-[10px] text-gray-500 mt-4 font-['Poppins'] tracking-wider uppercase"
                    >
                      Hint: Passcode is what Mani calls his love
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
