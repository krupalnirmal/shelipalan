"use client";

import { useState, useRef } from "react";
import {
  MAHARASHTRA_DISTRICTS,
  TALUKAS_BY_DISTRICT,
  VILLAGES_BY_TALUKA,
} from "@/lib/locations";

const DEFAULT_DISTRICT = "अहिल्यानगर";
const DEFAULT_TALUKA = "राहाता";

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
  const [gpsStatus, setGpsStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const villageRef = useRef<HTMLInputElement>(null);

  const talukas = TALUKAS_BY_DISTRICT[district] ?? [];
  const villages = VILLAGES_BY_TALUKA[taluka] ?? [];
  const listId = "village-list";

  async function handleGps() {
    if (!navigator.geolocation) {
      setGpsStatus("error");
      return;
    }
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
          const guessedVillage =
            addr.village ?? addr.hamlet ?? addr.suburb ?? addr.town ?? addr.city ?? "";
          if (villageRef.current && guessedVillage) {
            villageRef.current.value = guessedVillage;
          }
          setGpsStatus("ok");
        } catch {
          setGpsStatus("ok"); // coords saved even if reverse geocode fails
        }
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
          {gpsStatus === "loading"
            ? "शोधत आहे..."
            : gpsStatus === "ok"
            ? "✅ लोकेशन मिळालं"
            : gpsStatus === "error"
            ? "❌ GPS failed"
            : "📍 GPS ने भरा"}
        </button>
      </div>

      {lat != null && <input type="hidden" name="latitude" value={lat} />}
      {lng != null && <input type="hidden" name="longitude" value={lng} />}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">जिल्हा</label>
          <select
            name="district"
            required
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setTaluka("");
            }}
            className="input-field"
          >
            {MAHARASHTRA_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">तालुका</label>
          <select
            name="taluka"
            required
            value={taluka}
            onChange={(e) => setTaluka(e.target.value)}
            className="input-field"
            disabled={talukas.length === 0}
          >
            <option value="">-- निवडा --</option>
            {talukas.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {talukas.length === 0 && (
            <p className="text-xs text-stone-400 mt-1">यादी अजून उपलब्ध नाही.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">गाव</label>
          <input
            ref={villageRef}
            type="text"
            name="village"
            required
            list={listId}
            placeholder="गाव टाइप करा..."
            defaultValue={defaultVillage}
            className="input-field"
            autoComplete="off"
          />
          <datalist id={listId}>
            {villages.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>
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
