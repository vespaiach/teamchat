import { Logo } from '~/components/Logo';

export default function LeftBrandingPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      style={{ background: `linear-gradient(to bottom right, var(--color-primary), oklch(50% 0.245 27.325))` }}>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <Logo size={60} showText={false} className="text-white" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
