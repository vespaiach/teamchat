import { Logo, LogoIcon } from "./Logo";

export function LogoShowcase() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">TeamChat Logo Variations</h2>
      
      {/* Full Logo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Full Logo</h3>
        <div className="flex items-center space-x-6 p-4 bg-white rounded-lg">
          <Logo size={40} />
          <Logo size={50} />
          <Logo size={60} />
        </div>
      </div>

      {/* Icon Only */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Icon Only</h3>
        <div className="flex items-center space-x-6 p-4 bg-white rounded-lg">
          <LogoIcon size={24} />
          <LogoIcon size={32} />
          <LogoIcon size={40} />
          <LogoIcon size={48} />
        </div>
      </div>

      {/* On Dark Background */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">On Dark Background</h3>
        <div className="flex items-center space-x-6 p-6 bg-gray-900 rounded-lg">
          <Logo size={40} showText={false} />
          <div className="text-white text-2xl font-bold">TeamChat</div>
        </div>
      </div>

      {/* Logo Specifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Logo Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🗨️ Chat Bubble</h4>
            <p className="text-sm text-gray-600">Represents communication and messaging</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">👥 Team Dots</h4>
            <p className="text-sm text-gray-600">Three connected dots symbolizing team collaboration</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🔔 Notification</h4>
            <p className="text-sm text-gray-600">Active notification indicator for real-time updates</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🎨 Brand Colors</h4>
            <p className="text-sm text-gray-600">Uses your custom OKLCH primary color scheme</p>
          </div>
        </div>
      </div>
    </div>
  );
}
