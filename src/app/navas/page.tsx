import { prisma } from "@/lib/prisma";
import Breadcrumb from "@/components/Breadcrumb";
import GuideSection from "@/components/GuideSection";
import ListingCard from "@/components/ListingCard";

export default async function NavasPage() {
  const listings = await prisma.listing.findMany({
    where: { available: true, occasionReady: true },
    include: { village: true, photos: { take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "नवस/सण साठी बोकड" }]} />
      <h1 className="text-2xl font-bold text-stone-800">
        🙏 नवस/सण साठी बोकड-शेळी
      </h1>

      <GuideSection title="हे पेज कशासाठी?">
        <p>
          बकरी ईद यासारख्या सणांना तसंच नवस फेडण्यासाठी अनेकांना ठराविक
          गुण असलेला बोकड हवा असतो. शेतकऱ्यांनी असा बोकड/शेळी "नवस/सणासाठी
          उपलब्ध" म्हणून नोंदवली असेल, तर ती सगळी एंट्री इथे एकत्र दिसते —
          त्यामुळे थेट शेतकऱ्याकडून योग्य बोकड शोधणं सोपं होतं.
        </p>
      </GuideSection>

      <section>
        {listings.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            सध्या नवस/सणासाठी कुठलीही एंट्री उपलब्ध नाही.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {listings.map((listing) => (
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
                occasionReady={listing.occasionReady}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
