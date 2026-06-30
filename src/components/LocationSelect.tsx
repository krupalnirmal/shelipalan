"use client";

import { useState, useRef, useEffect } from "react";
import {
  MAHARASHTRA_DISTRICTS,
  TALUKAS_BY_DISTRICT,
  VILLAGE_ROMAN_INDEX,
} from "@/lib/locations";

const DEFAULT_DISTRICT = "अहिल्यानगर";
const DEFAULT_TALUKA = "राहाता";

function normalizeQuery(q: string) {
  return q.toLowerCase().replace(/w/g, "v").replace(/\s+/g, " ").trim();
}

function villageMatches(query: string, marathi: string, romanKeys: string): boolean {
  if (!query) return false;
  const q = normalizeQuery(query);
  // Match against Marathi name directly
  if (marathi.includes(query)) return true;
  // Match against Roman keys (w/v normalised)
  const keys = normalizeQuery(romanKeys);
  return keys.includes(q) || q.split(" ").every((part) => keys.includes(part));
}

export default function LocationSelect({
  defaultDistrict = DEFAULT_DISTRICT,
  defaultTaluka = DEFAULT_TALUKA,
  defaultVillage = "",
}: {
  defaultDistrict?: string;
  defaultTaluka?: string;
  defaultVillage?: string;
}) {
  const [district, setDistrict] = useState(defaultDistrict);
  const [taluka, setTaluka] = useState(defaultTaluka);
  const [villageInput, setVillageInput] = useState(defaultVillage);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const villageRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const talukas = TALUKAS_BY_DISTRICT[district] ?? [];

  // Village suggestions: filter VILLAGE_ROMAN_INDEX if we're in राहाता, else empty (free text)
  const suggestions =
    taluka === "राहाता" && villageInput.length >= 1
      ? VILLAGE_ROMAN_INDEX.filter(([marathi, roman]) =>
          villageMatches(villageInput, marathi, roman)
        ).slice(0, 8)
      : [];

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleGps() {
    if (!navigator.geolocation) { setGpsStatus("error"); return; }
    setGpsStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { "Accept-Language": "mr,en" } }
          );
          const data = await res.json();
          const addr = data.address ?? {};
          const guessed = addr.village ?? addr.hamlet ?? addr.suburb ?? addr.town ?? "";
          if (guessed) {
            setVillageInput(guessed);
            if (villageRef.current) villageRef.current.value = guessed;
          }
        } catch { /* coords saved even if reverse geocode fails */ }
        setGpsStatus("ok");
      },
      () => setGpsStatus("error")
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">📍 पत्ता</span>
        <button
          type="button"
          onClick={handleGps}
          disabled={gpsStatus === "loading"}
          className="text-xs px-3 py-1 rounded-full border border-green-600 text-green-700 hover:bg-green-50 transition disabled:opacity-50"
        >
          {gpsStatus === "loading" ? "शोधत आहे..." :
           gpsStatus === "ok" ? "✅ लोकेशन मिळालं" :
           gpsStatus === "error" ? "❌ GPS failed" :
           "📍 GPS ने भरा"}
        </button>
      </div>

      {lat != null && <input type="hidden" name="latitude" value={lat} />}
      {lng != null && <input type="hidden" name="longitude" value={lng} />}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">जिल्हा</label>
          <input
            type="text"
            name="district"
            value={district}
            readOnly
            className="input-field bg-stone-50 text-stone-500 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">तालुका</label>
          <input
            type="text"
            name="taluka"
            value={taluka}
            readOnly
            className="input-field bg-stone-50 text-stone-500 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div ref={containerRef} className="relative">
          <label className="block text-sm font-medium mb-1">गाव</label>
          <input
            ref={villageRef}
            type="text"
            name="village"
            required
            value={villageInput}
            onChange={(e) => { setVillageInput(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="गाव टाइप करा (मराठी/English)"
            className="input-field"
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 left-0 right-0 top-full mt-1 bg-white border border-stone-200 rounded-xl shadow-lg max-h-48 overflow-y-auto text-sm">
              {suggestions.map(([marathi]) => (
                <li key={marathi}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setVillageInput(marathi);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-green-50 hover:text-green-800"
                  >
                    {marathi}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">वस्ती (ऐच्छिक)</label>
          <input
            type="text"
            name="hamlet"
            placeholder="उदा. महादेव वाडी"
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
}
