"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteLoadingBar() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.target === "_blank") return;
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const destination = new URL(href, window.location.href);
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      ) {
        return;
      }

      setLoading(true);
    }

    function handleSubmit(e: SubmitEvent) {
      const form = e.target as HTMLFormElement;
      if (form.method?.toLowerCase() === "get") {
        setLoading(true);
      }
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  useEffect(() => {
    if (!loading) return;
    const fallback = setTimeout(() => setLoading(false), 8000);
    return () => clearTimeout(fallback);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-green-100 overflow-hidden">
      <div className="h-full w-1/3 bg-green-700 animate-route-loading" />
    </div>
  );
}
