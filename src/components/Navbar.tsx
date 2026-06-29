import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="bg-gradient-to-r from-green-800 to-green-600 text-white sticky top-0 z-10 shadow-md">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3.5">
        <Link href="/" className="text-xl font-bold whitespace-nowrap tracking-tight">
          🐐 शेळीपालन
        </Link>
        <div className="flex items-center gap-2 text-sm flex-wrap justify-end">
          <Link href="/guide" className="px-3 py-1.5 hover:text-orange-100">
            📚 मार्गदर्शन
          </Link>
          <Link href="/navas" className="px-3 py-1.5 hover:text-orange-100">
            🙏 नवस/सण
          </Link>

          {!user && (
            <>
              <Link href="/login" className="px-3 py-1.5 hover:text-orange-100">
                लॉगिन
              </Link>
              <Link
                href="/register"
                className="bg-white text-green-800 px-4 py-1.5 rounded-full font-semibold shadow-sm hover:bg-orange-50 transition"
              >
                नवीन शेतकरी
              </Link>
            </>
          )}

          {user?.role === "FARMER" && (
            <>
              <Link href="/dashboard" className="px-3 py-1.5 hover:text-orange-100">
                माझ्या एंट्री
              </Link>
              <Link
                href="/entry"
                className="bg-white text-green-800 px-4 py-1.5 rounded-full font-semibold shadow-sm hover:bg-orange-50 transition"
              >
                + नवीन एंट्री
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="px-3 py-1.5 hover:text-orange-100">
                  बाहेर पडा
                </button>
              </form>
            </>
          )}

          {user?.role === "ADMIN" && (
            <>
              <Link href="/admin" className="px-3 py-1.5 hover:text-orange-100">
                अॅडमिन
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="px-3 py-1.5 hover:text-orange-100">
                  बाहेर पडा
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
