"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Howl } from "howler";

import { birthdayConfig } from "@/config/birthday";
import { useEasterEggs } from "@/hooks/useEasterEggs";
import { AudioPlayer } from "@/components/AudioPlayer";
import { LockScreen } from "@/components/LockScreen";
import { HeartCanvas, HeartCanvasRef } from "@/components/HeartCanvas";
import { FloatingBalloons } from "@/components/FloatingBalloons";

// Import Sections
import { Hero } from "@/sections/Hero";
import { Letter } from "@/sections/Letter";
import { Timeline } from "@/sections/Timeline";
import { Gallery } from "@/sections/Gallery";
import { Reasons } from "@/sections/Reasons";
import { Counter } from "@/sections/Counter";
import { BucketList } from "@/sections/BucketList";
import { Music } from "@/sections/Music";
import { Surprise } from "@/sections/Surprise";

export default function Home() {
  const heartCanvasRef = useRef<HeartCanvasRef>(null);
  
  // Gatekeeping lock state
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Custom cursor position state for desktop cursor-glow
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [showCursor, setShowCursor] = useState(false);

  // Easter egg toast notification state
  const [easterEggNotification, setEasterEggNotification] = useState<{
    id: string;
    type: string;
    message: string;
  } | null>(null);

  // Unified audio states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  // Initialize background music loop
  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/audio/jordan-sandhu-birthday-full-song-jassi-x-bunty-bains-latest-punjabi-songs_Mmli3gSV.mp3"],
      html5: true,
      loop: true,
      volume: 0, // start muted for fade-in
      onload: () => {
        setIsAudioLoaded(true);
      },
      onplay: () => {
        setIsPlaying(true);
        soundRef.current?.fade(0, 0.4, 2000);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onstop: () => {
        setIsPlaying(false);
      },
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    if (soundRef.current && !soundRef.current.playing()) {
      soundRef.current.play();
    }
    // Launch a welcome rainfall of hearts!
    setTimeout(() => {
      heartCanvasRef.current?.triggerHeartRain();
    }, 600);
  };

  const handleTogglePlay = () => {
    if (!soundRef.current || !isAudioLoaded) return;

    if (soundRef.current.playing()) {
      soundRef.current.fade(soundRef.current.volume(), 0, 800);
      setTimeout(() => {
        soundRef.current?.pause();
      }, 800);
    } else {
      soundRef.current.play();
    }
  };

  // Mousemove handler for the pointer glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!showCursor) setShowCursor(true);
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showCursor]);

  // Handler for custom easter egg triggers
  const handleTriggerEasterEgg = (type: string, message: string) => {
    setEasterEggNotification({
      id: Math.random().toString(),
      type,
      message,
    });

    if (type === "konami" || type === "shake") {
      heartCanvasRef.current?.triggerHeartRain();
    }
  };

  // Setup Easter egg event hooks
  const { handleHeartClick, photoLongPressProps } = useEasterEggs(handleTriggerEasterEgg);

  // Auto-dismiss easter egg notifications after 5 seconds
  useEffect(() => {
    if (easterEggNotification) {
      const timer = setTimeout(() => {
        setEasterEggNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [easterEggNotification]);

  // Smooth scroll helper
  const handleOpenMyHeart = () => {
    const letterSection = document.getElementById("love-letter");
    if (letterSection) {
      letterSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className={`relative min-h-screen w-full bg-black text-white selection:bg-pink-500/30 selection:text-pink-300 ${isUnlocked ? "overflow-x-hidden" : "h-screen overflow-hidden"}`}>
      
      {/* 1. Desktop Cursor Glow Effect */}
      {showCursor && (
        <div
          className="cursor-glow hidden md:block"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      {/* 2. Interactive Floating Heart & Particle Canvas */}
      <HeartCanvas ref={heartCanvasRef} density={20} />

      {/* 2.5 Floating Balloon Popping Layer */}
      {isUnlocked && <FloatingBalloons />}

      {/* 3. Shared Ambient Romantic Music Player */}
      <AudioPlayer
        isPlaying={isPlaying}
        isLoaded={isAudioLoaded}
        onToggle={handleTogglePlay}
      />

      {/* 4. Cinematic Background Animated Auroras & Stars */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Top-Right Pink Orb */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-pink-600/10 to-transparent blur-[120px]"
        />

        {/* Middle-Left Purple/Rose Orb */}
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[30%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-rose-900/10 to-transparent blur-[140px]"
        />

        {/* Bottom-Right Deep Red Orb */}
        <motion.div
          animate={{
            x: [0, 60, -80, 0],
            y: [0, -40, 80, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-pink-900/10 to-transparent blur-[130px]"
        />

        {/* Subtle Twinkling Star Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.03)_0%,transparent_80%)]"></div>
      </div>

      {/* 5. Main content components */}
      <div className="relative z-10 w-full">
        {/* Hero Section (Includes loading screen) */}
        <Hero
          onOpenHeart={handleOpenMyHeart}
          nickname={birthdayConfig.nickname}
          age={birthdayConfig.birthdayAge}
        />

        {/* Love Letter Section */}
        <div onClick={handleHeartClick}>
          <Letter paragraphs={birthdayConfig.letterText} />
        </div>

        {/* Relationship Timeline */}
        <Timeline events={birthdayConfig.timelineEvents} />

        {/* Photo Gallery (Supports long-press triggers) */}
        <Gallery
          photos={birthdayConfig.galleryPhotos}
          photoLongPressProps={photoLongPressProps}
        />

        {/* Reasons I Love You Cards */}
        <Reasons reasons={birthdayConfig.reasons} />



        {/* Relationship Live Memory Counter */}
        <Counter startDateString={birthdayConfig.relationshipStartDate} />

        {/* Future Bucket Checklist */}
        <BucketList initialItems={birthdayConfig.bucketList} />

        {/* Soundtrack Section (Now synced to global mp3 track and Spotify iframe is removed) */}
        <Music
          isPlaying={isPlaying}
          isLoaded={isAudioLoaded}
          onToggle={handleTogglePlay}
        />

        {/* Surprise button Climax & Final Screen */}
        <Surprise
          youtubeVideoUrl={birthdayConfig.youtubeEmbedUrl}
          callNumber={birthdayConfig.callNumber}
          nickname={birthdayConfig.nickname}
          triggerHeartRain={() => heartCanvasRef.current?.triggerHeartRain()}
        />
      </div>

      {/* 5. Custom Easter Egg Toast Notification Overlay */}
      <AnimatePresence>
        {easterEggNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-[9999] glass-panel border border-pink-500/40 p-5 rounded-2xl shadow-[0_10px_40px_rgba(244,63,94,0.3)] bg-zinc-950/90 backdrop-blur-lg flex gap-4 items-start"
          >
            {/* Achievement Icon */}
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles size={20} />
            </div>

            {/* Achievement text */}
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-xs tracking-wider uppercase text-pink-400 font-['Poppins']">
                Secret Easter Egg Found!
              </h5>
              <p className="text-sm text-gray-200 mt-1 font-['Poppins'] leading-relaxed">
                {easterEggNotification.message}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setEasterEggNotification(null)}
              className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Lock Gate Screen overlay */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <LockScreen
              birthdayDate={birthdayConfig.birthdayDate}
              onUnlock={handleUnlock}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
