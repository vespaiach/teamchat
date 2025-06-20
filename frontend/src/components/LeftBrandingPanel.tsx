import { Logo } from "~/components/Logo";

export default function LeftBrandingPanel() {
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
          <h1 className="text-4xl font-bold mb-6">TeamChat</h1>
          <p className="text-xl mb-8 opacity-90">
            Bring your team together with seamless communication and collaboration.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Real-time messaging</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>File sharing & collaboration</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Organized channels & threads</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
