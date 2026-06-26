import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-4 flex-wrap">
      <Link href="/" className="hover:text-green-700 font-medium">
        🏠 होम
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-stone-300">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-green-700 font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-700 font-medium truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
