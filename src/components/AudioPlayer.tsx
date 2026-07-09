"use client";

import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  isLoaded: boolean;
  onToggle: () => void;
}

export function AudioPlayer({ isPlaying, isLoaded, onToggle }: AudioPlayerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {isPlaying && (
        <div className="flex items-end gap-[3px] h-4 px-2 py-1 bg-black/40 backdrop-blur-md rounded-full border border-pink-500/20">
          <div className="w-[3px] bg-pink-500 animate-pulse h-full rounded-full" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }}></div>
          <div className="w-[3px] bg-pink-500 animate-pulse h-2/3 rounded-full" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }}></div>
          <div className="w-[3px] bg-pink-500 animate-pulse h-4/5 rounded-full" style={{ animationDelay: '0.5s', animationDuration: '0.7s' }}></div>
          <div className="w-[3px] bg-pink-500 animate-pulse h-1/2 rounded-full" style={{ animationDelay: '0.2s', animationDuration: '0.5s' }}></div>
        </div>
      )}
      
      <button
        onClick={onToggle}
        disabled={!isLoaded}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-pink-500/30 bg-black/40 backdrop-blur-lg hover:bg-pink-500/10 hover:border-pink-500/60 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.15)] cursor-pointer"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        <div className="absolute inset-0 w-full h-full rounded-full bg-pink-500/10 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 rounded-full blur"></div>
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-pink-500 group-hover:text-pink-400 transition-colors z-10" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors z-10" />
        )}
      </button>
    </div>
  );
}
