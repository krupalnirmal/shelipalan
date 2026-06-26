"use client";

import { useState } from "react";
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

  const talukas = TALUKAS_BY_DISTRICT[district] ?? [];
  const villages = VILLAGES_BY_TALUKA[taluka] ?? [];

  return (
    <div className="space-y-3">
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
              <option key={d} value={d}>
                {d}
              </option>
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
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {talukas.length === 0 && (
            <p className="text-xs text-stone-400 mt-1">
              यादी अजून उपलब्ध नाही.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">गाव</label>
          {villages.length > 0 ? (
            <select
              name="village"
              required
              defaultValue={defaultVillage}
              className="input-field"
            >
              <option value="">-- निवडा --</option>
              {villages.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name="village"
              required
              placeholder="गावाचं नाव"
              defaultValue={defaultVillage}
              className="input-field"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            वस्ती (ऐच्छिक)
          </label>
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
