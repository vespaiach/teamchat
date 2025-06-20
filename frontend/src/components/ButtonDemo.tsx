import { Button, IconButton, ButtonGroup } from "./Button";

export function ButtonDemo() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 rounded-lg max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Button Component Showcase</h2>
      
      {/* Variant Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger Button</Button>
        </div>
      </div>

      {/* Size Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="xl">Extra Large</Button>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Buttons with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="primary"
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add Item
          </Button>
          
          <Button 
            variant="outline"
            rightIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            }
          >
            Continue
          </Button>

          <Button 
            variant="secondary"
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            }
          >
            Download
          </Button>
        </div>
      </div>

      {/* Loading States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Loading States</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" loading>
            Signing in...
          </Button>
          <Button variant="outline" loading>
            Loading...
          </Button>
          <Button variant="secondary" loading>
            Processing...
          </Button>
        </div>
      </div>

      {/* Disabled States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Disabled States</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" disabled>
            Disabled Primary
          </Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Full Width Buttons</h3>
        <div className="space-y-3 max-w-md">
          <Button variant="primary" fullWidth>
            Sign in
          </Button>
          <Button variant="outline" fullWidth>
            Create Account
          </Button>
        </div>
      </div>

      {/* Icon Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Icon Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <IconButton
            variant="primary"
            size="sm"
            aria-label="Add"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          />
          
          <IconButton
            variant="outline"
            size="md"
            aria-label="Settings"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />

          <IconButton
            variant="ghost"
            size="lg"
            aria-label="Close"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Button Groups */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Button Groups</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Horizontal Group</h4>
            <ButtonGroup orientation="horizontal">
              <Button variant="outline">Left</Button>
              <Button variant="outline">Middle</Button>
              <Button variant="outline">Right</Button>
            </ButtonGroup>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Vertical Group</h4>
            <ButtonGroup orientation="vertical" className="w-fit">
              <Button variant="outline">Top</Button>
              <Button variant="outline">Middle</Button>
              <Button variant="outline">Bottom</Button>
            </ButtonGroup>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Mixed States</h4>
            <ButtonGroup orientation="horizontal">
              <Button variant="primary">Active</Button>
              <Button variant="outline">Inactive</Button>
              <Button variant="outline">Inactive</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Real-world Examples</h3>
        
        <div className="space-y-6">
          {/* Form Actions */}
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="text-sm font-medium text-gray-600 mb-3">Form Actions</h4>
            <div className="flex gap-3">
              <Button variant="primary">Save Changes</Button>
              <Button variant="ghost">Cancel</Button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="text-sm font-medium text-gray-600 mb-3">Toolbar</h4>
            <div className="flex items-center gap-2">
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Bold"
                icon={<span className="font-bold text-sm">B</span>}
              />
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Italic"
                icon={<span className="italic text-sm">I</span>}
              />
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Underline"
                icon={<span className="underline text-sm">U</span>}
              />
              <div className="w-px h-4 bg-gray-300 mx-1" />
              <Button variant="outline" size="sm">
                Link
              </Button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-6 bg-white rounded-lg border text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready to get started?</h4>
            <p className="text-gray-600 mb-4">Join thousands of teams already using TeamChat</p>
            <div className="flex justify-center gap-3">
              <Button variant="primary" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Component Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Component Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🎨 Multiple Variants</h4>
            <p className="text-sm text-gray-600">Primary, secondary, outline, ghost, and danger styles</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">📏 Flexible Sizing</h4>
            <p className="text-sm text-gray-600">Four size options from small to extra large</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🔄 Loading States</h4>
            <p className="text-sm text-gray-600">Built-in loading spinner and disabled states</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Icon Support</h4>
            <p className="text-sm text-gray-600">Left/right icons and dedicated icon-only buttons</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">♿ Accessible</h4>
            <p className="text-sm text-gray-600">Proper ARIA attributes and keyboard navigation</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🎨 Brand Colors</h4>
            <p className="text-sm text-gray-600">Automatically uses your custom OKLCH color palette</p>
          </div>
        </div>
      </div>
    </div>
  );
}
