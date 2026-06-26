"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingText = "थोडं थांबा...",
  className = "btn-primary",
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          {pendingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
