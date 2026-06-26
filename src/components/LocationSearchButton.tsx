"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LocationSearchButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (!navigator.geolocation) {
      setError("तुमच्या ब्राउझरमध्ये लोकेशन सपोर्ट नाही.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("lat", String(pos.coords.latitude));
        params.set("lon", String(pos.coords.longitude));
        params.delete("village");
        setLoading(false);
        router.push(`/?${params.toString()}`);
      },
      () => {
        setLoading(false);
        setError("लोकेशन मिळालं नाही. ब्राउझरमध्ये लोकेशनला परवानगी द्या.");
      }
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-white text-green-800 font-semibold py-3 rounded-xl shadow-sm hover:bg-orange-50 transition disabled:opacity-60"
      >
        📍 {loading ? "लोकेशन शोधत आहे..." : "सध्याचं लोकेशन वापरा (जवळचं आधी दाखवा)"}
      </button>
      {error && <p className="text-orange-100 text-sm mt-2">{error}</p>}
    </div>
  );
}
