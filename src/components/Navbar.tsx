import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";

export default async function Navbar() {
  const user = await getCurrentUser();
  const linkClass =
    "block sm:inline-block px-3 py-2 sm:py-1.5 rounded-lg sm:rounded-none hover:bg-white/10 sm:hover:bg-transparent hover:text-orange-100";
  const ctaClass =
    "block sm:inline-block bg-white text-green-800 px-4 py-2 sm:py-1.5 rounded-full font-semibold shadow-sm hover:bg-orange-50 transition";

  const navLinks = (
    <>
      <Link href="/guide" className={linkClass}>
        📚 मार्गदर्शन
      </Link>
      <Link href="/navas" className={linkClass}>
        🙏 नवस/सण
      </Link>

      {!user && (
        <>
          <Link href="/login" className={linkClass}>
            लॉगिन
          </Link>
          <Link href="/register" className={ctaClass}>
            नवीन शेतकरी
          </Link>
        </>
      )}

      {user?.role === "FARMER" && (
        <>
          <Link href="/dashboard" className={linkClass}>
            माझ्या एंट्री
          </Link>
          <Link href="/entry" className={ctaClass}>
            + नवीन एंट्री
          </Link>
          <form action={logoutAction}>
            <button type="submit" className={`${linkClass} w-full sm:w-auto text-left`}>
              बाहेर पडा
            </button>
          </form>
        </>
      )}

      {user?.role === "ADMIN" && (
        <>
          <Link href="/admin" className={linkClass}>
            अॅडमिन
          </Link>
          <form action={logoutAction}>
            <button type="submit" className={`${linkClass} w-full sm:w-auto text-left`}>
              बाहेर पडा
            </button>
          </form>
        </>
      )}
    </>
  );

  return (
    <header className="bg-gradient-to-r from-green-800 to-green-600 text-white sticky top-0 z-10 shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-3.5">
        <input type="checkbox" id="nav-toggle" className="hidden peer" />

        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold whitespace-nowrap tracking-tight">
            🐐 शेळीपालन
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm">
            {navLinks}
          </div>

          <label
            htmlFor="nav-toggle"
            aria-label="मेनू उघडा"
            className="sm:hidden cursor-pointer p-2 -mr-2"
          >
            <span className="block w-6 h-0.5 bg-white mb-1.5 rounded-full" />
            <span className="block w-6 h-0.5 bg-white mb-1.5 rounded-full" />
            <span className="block w-6 h-0.5 bg-white rounded-full" />
          </label>
        </div>

        <div className="hidden peer-checked:flex sm:hidden flex-col gap-1 text-sm mt-3 pt-3 pb-1 border-t border-white/20">
          {navLinks}
        </div>
      </nav>
    </header>
  );
}
