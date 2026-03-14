"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/bengaluru_hero.png",
  "/assets/bengaluru_hero2.jpg",
  "/assets/bengaluru_hero3.jpg",
  "/assets/bengaluru_hero4.jpg",
  "/assets/bengaluru_hero5.jpeg",
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[4/5] md:aspect-square bg-slate-200/80 rounded-[40px] overflow-hidden border border-white shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Bengaluru city landscape"
          className="absolute inset-0 object-cover w-full h-full transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}
