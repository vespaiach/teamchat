import { useEffect, useRef } from 'react';

export default function AutoScrollIntoView({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 200);
  }, []);

  return <div ref={ref} className={className} />;
}
