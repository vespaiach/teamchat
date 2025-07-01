export default function DayBreaker({ date }: { date: Date }) {
  const isToday = date.toDateString() === new Date().toDateString();
  return (
    <div className="flex items-center text-neutral-500 px-4 justify-center py-6">
      <span className="px-2 font-sans bg-stone-100 rounded px-2 shrink-0">
        {isToday ? 'Today' : date.toDateString()}
      </span>
    </div>
  );
}