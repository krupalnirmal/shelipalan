export default function GuideSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-2">
      <h2 className="font-bold text-stone-800 text-lg">{title}</h2>
      <div className="text-sm text-stone-600 space-y-2 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
