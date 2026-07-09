"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin } from "lucide-react";
import { TimelineEvent } from "@/config/birthday";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <section id="relationship-timeline" className="relative min-h-screen py-24 px-4 bg-black overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-rose-950/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Our Journey Together
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-pink-500 mx-auto"
          ></motion.div>
        </div>

        {/* Timeline Axis Container */}
        <div className="relative">
          {/* Glowing vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-500/20 via-pink-500 to-rose-500/20 shadow-[0_0_10px_rgba(236,72,153,0.3)] hidden md:block"></div>

          {/* List of events */}
          <div className="flex flex-col gap-16 md:gap-24">
            {events.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center justify-between w-full relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Vertical Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black border-2 border-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.6)] z-20 hidden md:flex">
                    <span className="text-xs select-none">{event.icon}</span>
                  </div>

                  {/* Card Section */}
                  <div className={`w-full md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => setSelectedEvent(event)}
                      className="glass-panel p-6 sm:p-8 rounded-2xl border border-pink-500/10 cursor-pointer glass-panel-hover"
                    >
                      {/* Mobile node indicator */}
                      <div className="flex items-center gap-2 mb-3 md:hidden">
                        <span className="text-lg">{event.icon}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-semibold text-white mb-3">
                        {event.title}
                      </h3>

                      {/* Blurb */}
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {event.description}
                      </p>

                      {/* Interactive clue */}
                      <div className="mt-4 flex items-center justify-end md:justify-start gap-1 text-xs text-pink-500/70 hover:text-pink-500 font-medium group transition-colors">
                        <span className={`${isEven ? "md:ml-auto" : "md:mr-auto"}`}>Read details</span>
                        <span>✨</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for spacing on desktop */}
                  <div className="w-[45%] hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal / Lightbox Details */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-950/80 border border-pink-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.25)] flex flex-col md:flex-row max-h-[90vh] md:max-h-[70vh]"
            >
              {/* Event Image */}
              <div className="relative w-full md:w-1/2 h-64 md:h-full min-h-[250px] bg-zinc-900">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Event Details */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 p-2 rounded-full border border-pink-500/20 bg-black/40 hover:bg-pink-500/10 text-gray-400 hover:text-pink-500 transition-all cursor-pointer z-10"
                    aria-label="Close details"
                  >
                    <X size={16} />
                  </button>

                  {/* Header info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-pink-500 font-semibold tracking-wider uppercase mb-4">
                    <span className="flex items-center gap-1">
                      {selectedEvent.icon} Milestone
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white mb-4">
                    {selectedEvent.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-['Poppins',sans-serif]">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Footnote */}
                <div className="text-xs text-pink-500/50 italic border-t border-zinc-800 pt-4">
                  A beautiful memory from our hearts.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
