import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { distanceKm } from "@/lib/distance";
import { animalTypeLabel } from "@/lib/labels";
import ListingCard from "@/components/ListingCard";
import LocationSearchButton from "@/components/LocationSearchButton";
import BannerCarousel from "@/components/BannerCarousel";

type SearchParams = {
  lat?: string;
  lon?: string;
  village?: string;
  type?: string;
};

function buildQuery(params: SearchParams, overrides: SearchParams) {
  const merged = { ...params, ...overrides };
  const qs = new URLSearchParams();
  Object.entries(merged).forEach(([key, value]) => {
    if (value) qs.set(key, value);
  });
  return qs.toString();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const lat = params.lat ? parseFloat(params.lat) : null;
  const lon = params.lon ? parseFloat(params.lon) : null;

  const listings = await prisma.listing.findMany({
    where: {
      available: true,
      type: params.type ? (params.type as "BOKAD" | "SHELI" | "PILLU") : undefined,
      village: params.village ? { name: params.village } : undefined,
    },
    include: { village: true, photos: { take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  const withDistance = listings.map((listing) => ({
    listing,
    distance:
      lat != null && lon != null && listing.latitude != null && listing.longitude != null
        ? distanceKm(lat, lon, listing.latitude, listing.longitude)
        : null,
  }));

  if (lat != null && lon != null) {
    withDistance.sort((a, b) => {
      if (a.distance == null) return 1;
      if (b.distance == null) return -1;
      return a.distance - b.distance;
    });
  }

  const villages = await prisma.village.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <BannerCarousel />

      <section className="bg-gradient-to-br from-green-700 to-green-600 text-white rounded-2xl px-5 py-6 shadow-md">
        <h1 className="text-xl font-bold mb-1">🐐 गावातल्या शेळ्या-बोकड एका ठिकाणी</h1>
        <p className="text-green-50 text-sm mb-4">
          शेतकऱ्यांच्या एंट्री बघा, जवळचं आधी शोधा, थेट फोन करा.
        </p>
        <LocationSearchButton />
      </section>

      <section className="flex flex-wrap gap-2">
        <Link
          href={`/?${buildQuery(params, { type: "" })}`}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
            !params.type
              ? "bg-green-700 text-white border-green-700"
              : "bg-white border-stone-300 text-stone-700 hover:border-green-600"
          }`}
        >
          सगळे
        </Link>
        {Object.entries(animalTypeLabel).map(([value, label]) => (
          <Link
            key={value}
            href={`/?${buildQuery(params, { type: value })}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              params.type === value
                ? "bg-green-700 text-white border-green-700"
                : "bg-white border-stone-300 text-stone-700 hover:border-green-600"
            }`}
          >
            {label}
          </Link>
        ))}
      </section>

      <section>
        <form method="get" className="flex gap-2">
          {params.type && <input type="hidden" name="type" value={params.type} />}
          <select
            name="village"
            defaultValue={params.village ?? ""}
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
      </section>

      <section>
        {withDistance.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            अजून कुठलीही एंट्री नाही.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {withDistance.map(({ listing, distance }) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                type={listing.type}
                breed={listing.breed}
                ageMonths={listing.ageMonths}
                weightKg={listing.weightKg}
                price={listing.price}
                priceNegotiable={listing.priceNegotiable}
                photoUrl={listing.photos[0]?.url}
                villageName={listing.village?.name}
                distanceKm={distance ?? undefined}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
