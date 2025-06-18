import UserAvatar from "./UserAvatar.js";

interface ChatBaseProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

interface ChatProps extends ChatBaseProps {
  creatorAvatar: string;
  creatorName: string;
  createdAt: Date;
  messages: Array<{ id: number; message: string }>;
}

export function TheirChat({ creatorAvatar, creatorName, createdAt, messages, ...rest }: ChatProps) {
  return (
    <ChatBase {...rest} className="flex w-full text-sm gap-3 px-4">
      <UserAvatar name={creatorName} src={creatorAvatar} />
      <div className="flex-1 space-y-2">
        <p className="font-bold font-sans">{creatorName}</p>
        <div className="flex flex-col gap-2 items-start pl-2">
          {messages.map((items) => (
            <div key={items.id}>
              <div className="bg-stone-200 inline-block p-3 rounded-r-2xl rounded-bl-2xl">{items.message}</div>
            </div>
          ))}
          <p className="text-neutral-500 ml-2 font-sans text-xs">
            {createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>
      </div>
    </ChatBase>
  );
}

export function MyChat({ createdAt, messages, ...rest }: ChatProps) {
  return (
    <ChatBase {...rest} className="flex flex-col items-stretch gap-2 text-sm px-4">
      {messages.map((items) => (
        <div key={items.id} className="flex justify-end flex-1">
          <div className="bg-red-600 inline-block text-white p-3 rounded-l-2xl rounded-br-2xl max-w-[83%]">
            {items.message}
          </div>
        </div>
      ))}
      <p className="text-neutral-500 text-right mr-2 font-sans text-xs">
        {createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </p>
    </ChatBase>
  );
}

function ChatBase({ children, className, id }: ChatBaseProps) {
  return (
    <section className={className} id={id}>
      {children}
    </section>
  );
}


