import { requireAdmin } from "@/lib/auth";
import { assistedEntryAction } from "@/lib/admin-actions";
import ListingFormFields from "@/components/ListingFormFields";
import Breadcrumb from "@/components/Breadcrumb";
import SubmitButton from "@/components/SubmitButton";

export default async function AdminEntryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { error } = await searchParams;

  return (
    <div className="max-w-sm mx-auto mt-4">
      <Breadcrumb
        items={[
          { label: "अॅडमिन पॅनेल", href: "/admin" },
          { label: "शेतकऱ्याच्या वतीने एंट्री" },
        ]}
      />
      <h1 className="text-2xl font-bold mb-1 text-center text-stone-800">
        📞 शेतकऱ्याच्या वतीने एंट्री टाका
      </h1>
      <p className="text-sm text-gray-600 mb-4 text-center">
        शेतकऱ्याने फोनवर सांगितलेली माहिती इथे भरा. जर हा फोन नंबर आधीपासून
        नोंदणीकृत असेल तर नवीन एंट्री त्याच शेतकऱ्याच्या खात्यात जोडली जाईल.
      </p>

      {error === "missing" && (
        <p className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4">
          कृपया शेतकऱ्याचं नाव, मोबाईल नंबर आणि गाव भरा.
        </p>
      )}

      <form action={assistedEntryAction} className="space-y-4">
        <div className="form-card space-y-3">
          <p className="font-semibold text-sm text-stone-800">
            शेतकऱ्याची माहिती
          </p>
          <div>
            <label className="block text-sm font-medium mb-1">नाव</label>
            <input
              type="text"
              name="farmerName"
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              मोबाईल नंबर
            </label>
            <input
              type="tel"
              name="farmerPhone"
              required
              className="input-field"
              placeholder="9876543210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">गाव</label>
            <input type="text" name="farmerVillage" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              पत्ता / वाडी (ऐच्छिक)
            </label>
            <input type="text" name="address" className="input-field" />
          </div>
        </div>

        <div className="form-card space-y-4">
          <ListingFormFields />
        </div>

        <SubmitButton pendingText="सेव्ह होत आहे...">
          एंट्री सेव्ह करा
        </SubmitButton>
      </form>
    </div>
  );
}
