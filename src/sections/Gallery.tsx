"use client";

import { useState } from "react";
import Image from "next/image";
import { motion as fm, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Heart } from "lucide-react";
import { PolaroidCard } from "@/components/PolaroidCard";
import { PolaroidPhoto } from "@/config/birthday";

interface GalleryProps {
  photos: PolaroidPhoto[];
  photoLongPressProps: any;
}

export function Gallery({ photos, photoLongPressProps }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  return (
    <section id="photo-gallery" className="relative min-h-screen py-24 px-4 bg-zinc-950/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-pink-950/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <fm.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Moments Frozen in Time
          </fm.h2>
          <fm.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 max-w-md mx-auto text-sm sm:text-base font-['Poppins',sans-serif]"
          >
            Hold down on any memory to send a warm wish...
          </fm.p>
          <fm.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-pink-500 mx-auto mt-4"
          ></fm.div>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="break-inside-avoid">
              <PolaroidCard
                url={photo.url}
                caption={photo.caption}
                date={photo.date}
                rotation={photo.rotation || (idx % 2 === 0 ? -2 : 2)}
                onClick={() => setSelectedPhoto(photo)}
                longPressProps={photoLongPressProps}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <fm.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close trigger */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-pink-500/20 bg-black/40 hover:bg-pink-500/10 text-gray-400 hover:text-pink-500 transition-all cursor-pointer z-50"
              aria-label="Close photo"
            >
              <X size={20} />
            </button>

            {/* Polaroid Container */}
            <fm.div
              initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.9, rotate: 2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 pb-8 bg-white border border-gray-200 rounded-md shadow-2xl flex flex-col items-center"
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 rounded-sm">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
              </div>

              {/* Text info */}
              <div className="mt-6 flex flex-col justify-center items-center text-center">
                <p className="font-['Playfair_Display',serif] text-gray-800 text-xl sm:text-2xl leading-snug font-semibold italic max-w-sm">
                  {selectedPhoto.caption}
                </p>
                {selectedPhoto.date && (
                  <span className="mt-3 text-xs font-['Poppins',sans-serif] text-gray-500 tracking-widest uppercase font-semibold">
                    {selectedPhoto.date}
                  </span>
                )}
                <Heart className="w-5 h-5 text-red-500/20 fill-red-500/10 mt-4 animate-pulse" />
              </div>
            </fm.div>
          </fm.div>
        )}
      </AnimatePresence>
    </section>
  );
}
