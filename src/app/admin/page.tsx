import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { animalTypeLabel } from "@/lib/labels";
import Breadcrumb from "@/components/Breadcrumb";
import { adminDeleteListingAction } from "@/lib/admin-actions";

export default async function AdminPage() {
  await requireAdmin();

  const listings = await prisma.listing.findMany({
    include: { owner: true, village: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "अॅडमिन पॅनेल" }]} />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-bold text-stone-800">
          अॅडमिन पॅनेल{" "}
          <span className="text-sm font-normal text-stone-500">
            ({listings.length} एंट्री)
          </span>
        </h1>
        <Link
          href="/admin/entry"
          className="bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:bg-green-800 transition"
        >
          + शेतकऱ्याच्या वतीने एंट्री
        </Link>
      </div>

      <div className="space-y-2">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex items-center justify-between bg-white border border-stone-200 rounded-xl p-3 text-sm shadow-sm"
          >
            <div>
              <p className="font-semibold text-stone-800">
                {animalTypeLabel[listing.type]}
                {listing.breed ? ` - ${listing.breed}` : ""}{" "}
                {!listing.available && (
                  <span className="text-stone-400 font-normal">(विकलं गेलं)</span>
                )}
              </p>
              <p className="text-stone-500">
                {listing.owner.name} · {listing.owner.phone} ·{" "}
                {listing.village?.name ?? "गाव नाही"}
              </p>
            </div>
            <form action={adminDeleteListingAction}>
              <input type="hidden" name="id" value={listing.id} />
              <button className="bg-red-50 text-red-700 hover:bg-red-100 px-2.5 py-1 rounded-lg text-xs transition">
                हटवा
              </button>
            </form>
          </div>
        ))}

        {listings.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            अजून कुठलीही एंट्री नाही.
          </p>
        )}
      </div>
    </div>
  );
}
