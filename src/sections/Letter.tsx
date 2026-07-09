"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface LetterProps {
  paragraphs: string[];
}

export function Letter({ paragraphs }: LetterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection observer to trigger typing when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Character-by-character typing effect
  useEffect(() => {
    if (!isVisible) return;

    if (currentParagraphIndex < paragraphs.length) {
      const fullText = paragraphs[currentParagraphIndex];
      let charIndex = 0;
      setCurrentText("");

      const typeChar = () => {
        if (charIndex < fullText.length) {
          setCurrentText((prev) => prev + fullText.charAt(charIndex));
          charIndex++;
          typingTimerRef.current = setTimeout(typeChar, 35); // 35ms per character
        } else {
          // Finished typing this paragraph, add to typed list
          setTypedParagraphs((prev) => [...prev, fullText]);
          setCurrentParagraphIndex((prev) => prev + 1);
          setCurrentText("");
        }
      };

      typeChar();
    }

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [isVisible, currentParagraphIndex, paragraphs]);

  return (
    <section
      id="love-letter"
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background soft pink lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative w-full max-w-2xl z-10">
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-panel rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_0_rgba(244,63,94,0.1)] border border-pink-500/10 relative overflow-hidden"
        >
          {/* Subtle Heart Background Overlay */}
          <div className="absolute -right-16 -top-16 text-pink-500/5 select-none pointer-events-none">
            <Heart size={200} fill="currentColor" />
          </div>

          <div className="flex flex-col gap-6 font-['Playfair_Display',serif] text-rose-100/90 text-lg sm:text-xl italic leading-relaxed">
            {/* Render already typed paragraphs */}
            {typedParagraphs.map((para, idx) => (
              <p key={idx} className={idx === 0 ? "font-bold text-2xl not-italic text-pink-500 mb-2 font-['Poppins']" : idx === paragraphs.length - 1 ? "font-bold text-2xl not-italic text-rose-500 mt-4 text-right font-['Poppins']" : ""}>
                {para}
              </p>
            ))}

            {/* Render currently typing paragraph */}
            {currentParagraphIndex < paragraphs.length && (
              <p className={currentParagraphIndex === 0 ? "font-bold text-2xl not-italic text-pink-500 mb-2 font-['Poppins']" : currentParagraphIndex === paragraphs.length - 1 ? "font-bold text-2xl not-italic text-rose-500 mt-4 text-right font-['Poppins']" : ""}>
                {currentText}
                <span className="animate-pulse font-bold text-pink-500">|</span>
              </p>
            )}
          </div>

          {/* Decorative bottom lines */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-pink-500/20"></div>
            <Heart className="w-5 h-5 text-pink-500/40 animate-pulse" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-pink-500/20"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
