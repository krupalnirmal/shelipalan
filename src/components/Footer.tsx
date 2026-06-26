export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 mt-10">
      <div className="max-w-5xl mx-auto px-4 py-6 text-sm space-y-2">
        <p className="text-stone-100 font-semibold">🐐 शेळीपालन</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-stone-400">
          <a href="tel:9762415808" className="hover:text-white transition">
            📞 9762415808
          </a>
          <a
            href="mailto:krupalnirmal0301@gmail.com"
            className="hover:text-white transition"
          >
            ✉️ krupalnirmal0301@gmail.com
          </a>
        </div>
        <p className="text-stone-500 text-xs pt-2 border-t border-stone-700">
          Developed by <span className="text-stone-300">Nirmal Krupal</span>
        </p>
      </div>
    </footer>
  );
}
