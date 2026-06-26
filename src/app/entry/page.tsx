import { requireFarmer } from "@/lib/auth";
import { createListingAction } from "@/lib/listing-actions";
import ListingFormFields from "@/components/ListingFormFields";
import Breadcrumb from "@/components/Breadcrumb";
import SubmitButton from "@/components/SubmitButton";

export default async function EntryPage() {
  await requireFarmer();

  return (
    <div className="max-w-sm mx-auto mt-4">
      <Breadcrumb
        items={[
          { label: "माझ्या एंट्री", href: "/dashboard" },
          { label: "नवीन एंट्री" },
        ]}
      />
      <h1 className="text-2xl font-bold mb-1 text-center text-stone-800">
        🐐 नवीन एंट्री टाका
      </h1>
      <p className="text-sm text-gray-600 mb-4 text-center">
        नवीन पिल्लू जन्मलं किंवा शेळी/बोकड विक्रीसाठी आहे - खाली माहिती भरा.
      </p>

      <div className="form-card">
        <form action={createListingAction} className="space-y-4">
          <ListingFormFields />

          <SubmitButton pendingText="सेव्ह होत आहे...">
            एंट्री सेव्ह करा
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
