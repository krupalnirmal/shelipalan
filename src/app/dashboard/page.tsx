import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireFarmer } from "@/lib/auth";
import { animalTypeLabel } from "@/lib/labels";
import Breadcrumb from "@/components/Breadcrumb";
import {
  markSoldAction,
  markAvailableAction,
  deleteListingAction,
} from "@/lib/listing-actions";

export default async function DashboardPage() {
  const user = await requireFarmer();

  const listings = await prisma.listing.findMany({
    where: { ownerId: user.id },
    include: { photos: { take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Breadcrumb items={[{ label: "माझ्या एंट्री" }]} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-stone-800">माझ्या एंट्री</h1>
        <Link
          href="/entry"
          className="bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:bg-green-800 transition"
        >
          + नवीन
        </Link>
      </div>

      <Link
        href="/guide"
        className="block bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm hover:bg-amber-100 transition"
      >
        📚 <span className="font-semibold text-amber-800">शेळीपालन सुधारायचं आहे?</span>{" "}
        <span className="text-amber-700">खुराक, शेड आणि सरकारी योजनांची माहिती वाचा →</span>
      </Link>

      {listings.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          अजून तुम्ही कुठलीही एंट्री टाकलेली नाही.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex gap-3 bg-white border border-stone-200 rounded-2xl p-3 shadow-sm"
          >
            <div className="w-20 h-20 rounded-xl bg-stone-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
              {listing.photos[0] ? (
                <img
                  src={listing.photos[0].url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl">🐐</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-stone-800">
                {animalTypeLabel[listing.type]}
                {listing.breed ? ` - ${listing.breed}` : ""}
              </p>
              <p className="text-xs">
                {listing.available ? (
                  <span className="text-green-700 font-medium">● उपलब्ध</span>
                ) : (
                  <span className="text-stone-400 font-medium">● विकलं गेलं</span>
                )}
              </p>

              <div className="flex gap-2 mt-2 text-xs flex-wrap">
                {listing.available ? (
                  <form action={markSoldAction}>
                    <input type="hidden" name="id" value={listing.id} />
                    <button className="bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-lg transition">
                      विकलं म्हणून मार्क करा
                    </button>
                  </form>
                ) : (
                  <form action={markAvailableAction}>
                    <input type="hidden" name="id" value={listing.id} />
                    <button className="bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-lg transition">
                      पुन्हा उपलब्ध करा
                    </button>
                  </form>
                )}
                <form action={deleteListingAction}>
                  <input type="hidden" name="id" value={listing.id} />
                  <button className="bg-red-50 text-red-700 hover:bg-red-100 px-2 py-1 rounded-lg transition">
                    काढून टाका
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
