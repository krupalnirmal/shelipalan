import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SubmitButton from "@/components/SubmitButton";
import { loginAction } from "@/lib/auth-actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-sm mx-auto mt-4">
      <Breadcrumb items={[{ label: "लॉगिन" }]} />
      <h1 className="text-2xl font-bold mb-4 text-center text-stone-800">
        🐐 लॉगिन करा
      </h1>

      <div className="form-card">
        {error === "invalid" && (
          <p className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4">
            मोबाईल नंबर किंवा पासवर्ड चुकीचा आहे.
          </p>
        )}

        <form action={loginAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              मोबाईल नंबर
            </label>
            <input
              type="tel"
              name="phone"
              required
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
              className="input-field"
            />
          </div>

          <SubmitButton pendingText="लॉगिन होत आहे...">
            लॉगिन
          </SubmitButton>
        </form>
      </div>

      <p className="text-sm mt-4 text-center">
        खाते नाही?{" "}
        <Link href="/register" className="text-green-700 font-semibold">
          नवीन शेतकरी रजिस्ट्रेशन
        </Link>
      </p>
    </div>
  );
}
