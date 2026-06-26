import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { animalTypeLabel, genderLabel } from "@/lib/labels";
import Breadcrumb from "@/components/Breadcrumb";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id: parseInt(id, 10) },
    include: { owner: true, village: true, photos: true },
  });

  if (!listing) notFound();

  const mapsUrl =
    listing.latitude != null && listing.longitude != null
      ? `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`
      : null;

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Breadcrumb
        items={[
          {
            label: `${animalTypeLabel[listing.type]}${listing.breed ? " - " + listing.breed : ""}`,
          },
        ]}
      />
      <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-200">
        {listing.photos.length > 0 ? (
          <img
            src={listing.photos[0].url}
            alt={animalTypeLabel[listing.type]}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-stone-100 flex items-center justify-center text-6xl">
            🐐
          </div>
        )}
        {listing.photos.length > 1 && (
          <div className="grid grid-cols-3 gap-1 p-1 bg-white">
            {listing.photos.slice(1).map((photo) => (
              <img
                key={photo.id}
                src={photo.url}
                alt=""
                className="w-full h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-stone-800">
          {animalTypeLabel[listing.type]}
          {listing.breed ? ` - ${listing.breed}` : ""}
        </h1>
        {!listing.available && (
          <span className="inline-block bg-stone-200 text-stone-700 text-xs font-medium px-2.5 py-1 rounded-full mt-2">
            विकलं गेलं
          </span>
        )}
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2.5 text-sm">
        {listing.ageMonths != null && (
          <p className="flex justify-between">
            <span className="text-stone-500">वय</span>
            <span className="font-medium">{listing.ageMonths} महिने</span>
          </p>
        )}
        {listing.weightKg != null && (
          <p className="flex justify-between">
            <span className="text-stone-500">वजन</span>
            <span className="font-medium">{listing.weightKg} किलो</span>
          </p>
        )}
        {listing.gender && (
          <p className="flex justify-between">
            <span className="text-stone-500">लिंग</span>
            <span className="font-medium">{genderLabel[listing.gender]}</span>
          </p>
        )}
        {listing.vaccinated != null && (
          <p className="flex justify-between">
            <span className="text-stone-500">लसीकरण</span>
            <span className="font-medium">
              {listing.vaccinated ? "झालेलं आहे" : "झालेलं नाही"}
            </span>
          </p>
        )}
        <p className="flex justify-between">
          <span className="text-stone-500">किंमत</span>
          <span className="font-bold text-green-700">
            {listing.price != null
              ? `₹${listing.price.toLocaleString("en-IN")}`
              : "बोलणीने"}
            {listing.priceNegotiable && listing.price != null ? " (बोलणी होऊ शकते)" : ""}
          </span>
        </p>
        {listing.village && (
          <p className="flex justify-between">
            <span className="text-stone-500">गाव</span>
            <span className="font-medium">
              📌 {listing.village.name}
              {listing.hamlet ? ` - ${listing.hamlet}` : ""}
            </span>
          </p>
        )}
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3">
        <p className="font-semibold text-stone-800">{listing.owner.name}</p>
        {listing.owner.address && (
          <p className="text-sm text-stone-600">{listing.owner.address}</p>
        )}

        <a
          href={`tel:${listing.contactPhone ?? listing.owner.phone}`}
          className="block text-center bg-green-700 text-white font-semibold py-3 rounded-xl shadow-sm hover:bg-green-800 transition"
        >
          📞 Call Now - {listing.contactPhone ?? listing.owner.phone}
        </a>

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center border border-green-700 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition"
          >
            🗺️ दिशादर्शन (Google Maps)
          </a>
        )}
      </div>
    </div>
  );
}
