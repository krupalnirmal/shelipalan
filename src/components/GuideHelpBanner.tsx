export default function GuideHelpBanner() {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-600 text-white rounded-2xl px-5 py-5 shadow-md flex items-center gap-4 flex-wrap">
      <div className="text-4xl flex-shrink-0">🙋</div>
      <div className="flex-1 min-w-[180px]">
        <p className="font-bold text-lg leading-snug">
          कुठलीही अडचण आली तर संपर्क करा
        </p>
        <p className="text-blue-50 text-sm">निर्मळ कृपाळ पोपट</p>
      </div>
      <a
        href="tel:9762415808"
        className="bg-white text-blue-700 font-bold px-5 py-2.5 rounded-full shadow-sm hover:bg-blue-50 transition whitespace-nowrap"
      >
        📞 9762415808
      </a>
    </section>
  );
}
