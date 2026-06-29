"use client";

import { useRouter } from "next/navigation";

export default function VillageSearchForm({
  villages,
  currentType,
  currentVillage,
  currentOccasion,
}: {
  villages: { id: number; name: string }[];
  currentType?: string;
  currentVillage?: string;
  currentOccasion?: string;
}) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const qs = new URLSearchParams();
    if (currentType) qs.set("type", currentType);
    if (currentOccasion) qs.set("occasion", currentOccasion);
    const village = String(formData.get("village") ?? "");
    if (village) qs.set("village", village);
    router.push(`/?${qs.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <select
        name="village"
        defaultValue={currentVillage ?? ""}
        className="flex-1 border border-stone-300 bg-white rounded-lg px-3 py-2 text-sm"
      >
        <option value="">-- गाव निवडा --</option>
        {villages.map((v) => (
          <option key={v.id} value={v.name}>
            {v.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-stone-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-stone-700 transition"
      >
        शोधा
      </button>
    </form>
  );
}
