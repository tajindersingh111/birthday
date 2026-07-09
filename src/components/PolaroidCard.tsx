"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PolaroidCardProps {
  url: string;
  caption: string;
  date?: string;
  rotation?: number;
  onClick?: () => void;
  longPressProps?: any;
}

export function PolaroidCard({
  url,
  caption,
  date,
  rotation = 0,
  onClick,
  longPressProps,
}: PolaroidCardProps) {
  return (
    <motion.div
      className="inline-block p-4 pb-6 bg-white border border-gray-200 rounded shadow-2xl cursor-pointer hover:z-20 w-full"
      style={{ rotate: rotation }}
      whileHover={{
        scale: 1.05,
        rotate: rotation + (rotation > 0 ? 3 : -3),
        boxShadow: "0 25px 50px -12px rgba(244, 63, 94, 0.4), 0 0 20px rgba(244, 63, 94, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      {...longPressProps}
    >
      {/* Photo area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 rounded-sm">
        <Image
          src={url}
          alt={caption}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-300 filter contrast-[1.02] brightness-[0.98] saturate-[0.95]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-70 pointer-events-none"></div>
      </div>

      {/* Caption Area */}
      <div className="mt-4 flex flex-col justify-center items-center text-center">
        <p className="font-['Playfair_Display',serif] text-gray-800 text-lg leading-tight font-semibold italic">
          {caption}
        </p>
        {date && (
          <span className="mt-2 text-xs font-['Poppins',sans-serif] text-gray-500 tracking-wider uppercase font-medium">
            {date}
          </span>
        )}
      </div>
    </motion.div>
  );
}
