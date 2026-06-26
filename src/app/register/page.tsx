import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SubmitButton from "@/components/SubmitButton";
import { registerAction } from "@/lib/auth-actions";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-sm mx-auto mt-4">
      <Breadcrumb items={[{ label: "नवीन शेतकरी रजिस्ट्रेशन" }]} />
      <h1 className="text-2xl font-bold mb-4 text-center text-stone-800">
        🐐 नवीन शेतकरी रजिस्ट्रेशन
      </h1>

      <div className="form-card">
        {error === "phone-exists" && (
          <p className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4">
            या मोबाईल नंबरने आधीच एक खाते आहे. लॉगिन करा.
          </p>
        )}
        {error === "missing" && (
          <p className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4">
            कृपया सगळी माहिती भरा.
          </p>
        )}

        <form action={registerAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">तुमचं नाव</label>
            <input type="text" name="name" required className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              मोबाईल नंबर
            </label>
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9]{10}"
              className="input-field"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">पासवर्ड</label>
            <input
              type="password"
              name="password"
              required
              minLength={4}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">गाव</label>
            <input
              type="text"
              name="village"
              required
              className="input-field"
              placeholder="उदा. वडगाव"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              पत्ता / वाडी (ऐच्छिक)
            </label>
            <input type="text" name="address" className="input-field" />
          </div>

          <SubmitButton pendingText="रजिस्टर होत आहे...">
            रजिस्टर करा
          </SubmitButton>
        </form>
      </div>

      <p className="text-sm mt-4 text-center">
        आधीच खाते आहे?{" "}
        <Link href="/login" className="text-green-700 font-semibold">
          लॉगिन करा
        </Link>
      </p>
    </div>
  );
}
