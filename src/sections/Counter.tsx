"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Image from "next/image";

interface CounterProps {
  startDateString: string;
}

interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Counter({ startDateString }: CounterProps) {
  const [timeLeft, setTimeLeft] = useState<TimeDifference>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDateString);
      const now = new Date();

      if (isNaN(start.getTime())) {
        console.error("Invalid date string provided to Counter:", startDateString);
        return;
      }

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      // Normalize values if negative
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        // Get days in the previous month relative to 'now'
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeLeft({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [startDateString]);

  const timeUnits = [
    { label: "Years", value: timeLeft.years },
    { label: "Months", value: timeLeft.months },
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="memory-counter" className="relative min-h-[70vh] py-24 px-4 bg-black overflow-hidden flex items-center justify-center">
      {/* Background Airport Image Watermark */}
      <div className="absolute inset-0 z-0 opacity-[0.55] pointer-events-none overflow-hidden select-none">
        <Image
          src="/photos/WhatsApp Image 2026-07-09 at 4.46.02 PM.jpeg"
          alt="Airport Memory Background"
          fill
          priority
          className="object-cover filter brightness-[0.75] contrast-[1.1] saturate-[0.85]"
        />
        {/* Vignette fade to black at edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black opacity-95 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black opacity-95 pointer-events-none z-0"></div>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-pink-900/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative w-full max-w-5xl z-10 flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 rounded-full border border-pink-500/20 bg-black/40 flex items-center justify-center mb-4 mx-auto text-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.1)]"
          >
            <Clock size={20} className="animate-spin [animation-duration:15s]" />
          </motion.div>
          
          <h2 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-white mb-4">
            How Long Have I Loved You?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-['Poppins',sans-serif]">
            Every second since our story began, cataloged in real-time
          </p>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-4"></div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 w-full max-w-4xl">
          {timeUnits.map((unit, idx) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-black/25 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-pink-500/10 flex flex-col items-center justify-center text-center shadow-[0_4px_30px_rgba(0,0,0,0.3)] select-none hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] transition-all duration-300"
            >
              {/* Digit with smooth ease */}
              <span className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-white tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                {unit.value.toString().padStart(2, "0")}
              </span>
              {/* Label */}
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-pink-500 uppercase mt-3 font-['Poppins']">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
