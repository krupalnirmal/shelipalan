import Link from "next/link";
import { animalTypeLabel } from "@/lib/labels";

type Props = {
  id: number;
  type: string;
  breed: string | null;
  ageMonths: number | null;
  weightKg: number | null;
  price: number | null;
  priceNegotiable: boolean;
  photoUrl?: string;
  villageName?: string;
  distanceKm?: number;
};

const typeBadgeColor: Record<string, string> = {
  BOKAD: "bg-amber-600",
  SHELI: "bg-rose-500",
  PILLU: "bg-green-600",
};

export default function ListingCard({
  id,
  type,
  breed,
  ageMonths,
  weightKg,
  price,
  priceNegotiable,
  photoUrl,
  villageName,
  distanceKm,
}: Props) {
  return (
    <Link
      href={`/listing/${id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative w-full h-44 bg-stone-100 overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={animalTypeLabel[type]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            🐐
          </div>
        )}
        <span
          className={`absolute top-2 left-2 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${typeBadgeColor[type] ?? "bg-stone-600"}`}
        >
          {animalTypeLabel[type]}
        </span>
        {distanceKm != null && (
          <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            📍 {distanceKm.toFixed(1)} किमी
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="font-semibold text-stone-800 truncate">
          {breed || animalTypeLabel[type]}
        </p>
        <p className="text-sm text-stone-500">
          {ageMonths != null ? `${ageMonths} महिने` : ""}
          {ageMonths != null && weightKg != null ? " · " : ""}
          {weightKg != null ? `${weightKg} किलो` : ""}
        </p>
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-green-700">
            {price != null ? `₹${price.toLocaleString("en-IN")}` : "बोलणीने"}
            {priceNegotiable && price != null && (
              <span className="text-xs font-normal text-stone-400"> (बोलणी)</span>
            )}
          </p>
          {villageName && (
            <p className="text-xs text-stone-500 truncate max-w-[45%]">
              📌 {villageName}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
