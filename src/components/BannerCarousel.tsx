"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InstallButton from "@/components/InstallButton";

const SLIDES = [
  "/images/banners/for_homepage.png",
  "/images/promo/entry-promo.png",
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200">
      <a
        href="tel:9762415808"
        className="block aspect-[16/9] overflow-hidden bg-stone-100"
      >
        <img
          src={SLIDES[index]}
          alt="शेळीपालन - संपर्क करा"
          className="w-full h-full object-cover"
        />
      </a>
      <div className="absolute bottom-3 left-3">
        <Link
          href="/register"
          className="bg-white text-green-800 px-4 py-1.5 rounded-full font-semibold shadow-md hover:bg-orange-50 transition text-sm"
        >
          🐐 नवीन शेतकरी
        </Link>
      </div>
      <div className="absolute bottom-3 right-3">
        <InstallButton />
      </div>
      <div className="flex justify-center gap-1.5 py-2 bg-white">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`स्लाईड ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition ${
              i === index ? "bg-green-700" : "bg-stone-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
