interface ChatProps {
  creatorAvatar: string;
  creatorName: string;
  createdAt: Date;
  messages: string[];
}

export function TheirChat({ creatorAvatar, creatorName, createdAt, messages }: ChatProps) {
  return (
    <section className="flex w-full text-sm gap-4 px-4">
      <img src={creatorAvatar} alt={`${creatorName}'s avatar`} className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <p className="font-bold">{creatorName}</p>
        <div className="flex flex-col gap-2 items-start pl-2">
          {messages.map((message, index) => (
            <div key={index}>
              <div className="bg-stone-200 inline-block p-3 rounded-r-2xl rounded-bl-2xl">
                {message}
              </div>
            </div>
          ))}
          <p className="text-neutral-500 ml-2 font-sans text-xs">
            {createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>
      </div>
    </section>
  );
}

export function MyChat({ createdAt, messages }: ChatProps) {
  return (
    <section className="flex flex-col items-end gap-2 text-sm px-4">
      {messages.map((message, index) => (
        <div key={index} className="flex justify-end">
          <div className="bg-red-600 inline-block text-white p-3 rounded-l-2xl rounded-br-2xl w-[83%]">
            {message}
          </div>
        </div>
      ))}
      <p className="text-neutral-500 text-right mr-2 font-sans text-xs">
        {createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </p>
    </section>
  );
}

export function DayBreak({ date }: { date: Date }) {
  const isToday = date.toDateString() === new Date().toDateString();
  return (
    <div className="flex items-center text-neutral-500">
      <hr className="flex-1 border-t border-stone-100 flex-1" />
      <span className="px-2 font-sans bg-stone-100 rounded px-2 shrink-0">{isToday ? 'Today' : date.toLocaleDateString()}</span>
      <hr className="flex-1 border-t border-stone-100 flex-1" />
    </div>
  );
}