"use client";

import { useEffect, useState } from "react";

export default function IosInstallHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem("ios-install-hint-dismissed");

    if (isIOS && !isStandalone && !dismissed) {
      setShow(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem("ios-install-hint-dismissed", "1");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 bg-stone-800 text-white text-sm rounded-xl p-3 shadow-lg flex items-start gap-2">
      <p className="flex-1">
        📱 हे अॅप तुमच्या होम स्क्रीनवर टाकायचं असेल तर खालच्या शेअर बटण{" "}
        <span aria-hidden>⎋</span> वर दाबा, मग{" "}
        <strong>"Add to Home Screen"</strong> निवडा.
      </p>
      <button
        onClick={dismiss}
        aria-label="बंद करा"
        className="text-stone-400 hover:text-white text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
