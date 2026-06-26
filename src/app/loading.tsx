export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-stone-500">
      <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
      <p className="text-sm font-medium">लोड होत आहे...</p>
    </div>
  );
}
