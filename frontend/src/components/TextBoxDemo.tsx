import { TextBox, PasswordTextBox, EmailTextBox } from "./TextBox";

export function TextBoxDemo() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 rounded-lg max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">TextBox Component Showcase</h2>
      
      {/* Basic TextBox */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Basic TextBox</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextBox 
            label="Default TextBox"
            placeholder="Enter text..."
            helperText="This is a helper text"
          />
          <TextBox 
            label="Required Field"
            placeholder="Required field..."
            required
          />
        </div>
      </div>

      {/* Size Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Size Variants</h3>
        <div className="space-y-3">
          <TextBox 
            label="Small Size"
            size="sm"
            placeholder="Small textbox..."
          />
          <TextBox 
            label="Medium Size (Default)"
            size="md"
            placeholder="Medium textbox..."
          />
          <TextBox 
            label="Large Size"
            size="lg"
            placeholder="Large textbox..."
          />
        </div>
      </div>

      {/* Style Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Style Variants</h3>
        <div className="space-y-3">
          <TextBox 
            label="Default Style"
            variant="default"
            placeholder="Default style..."
          />
          <TextBox 
            label="Filled Style"
            variant="filled"
            placeholder="Filled style..."
          />
          <TextBox 
            label="Outlined Style"
            variant="outlined"
            placeholder="Outlined style..."
          />
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">With Icons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextBox 
            label="Search"
            placeholder="Search..."
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            iconPosition="left"
          />
          <TextBox 
            label="Amount"
            placeholder="0.00"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            iconPosition="left"
          />
        </div>
      </div>

      {/* Specialized TextBoxes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Specialized TextBoxes</h3>
        <div className="space-y-3">
          <EmailTextBox 
            label="Email Address"
            placeholder="your.email@example.com"
            helperText="We'll never share your email"
          />
          <PasswordTextBox 
            label="Password"
            placeholder="Enter your password"
            helperText="Password must be at least 8 characters"
          />
        </div>
      </div>

      {/* Error States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Error States</h3>
        <div className="space-y-3">
          <TextBox 
            label="Invalid Input"
            placeholder="This field has an error"
            error="This field is required"
            defaultValue="invalid@"
          />
          <EmailTextBox 
            label="Invalid Email"
            placeholder="Enter email"
            error="Please enter a valid email address"
            defaultValue="invalid-email"
          />
        </div>
      </div>

      {/* Disabled State */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Disabled State</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextBox 
            label="Disabled Field"
            placeholder="Cannot edit this field"
            disabled
          />
          <TextBox 
            label="Disabled with Value"
            defaultValue="Read-only value"
            disabled
          />
        </div>
      </div>

      {/* Usage Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Component Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🎨 Customizable</h4>
            <p className="text-sm text-gray-600">Multiple variants, sizes, and icon support</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">♿ Accessible</h4>
            <p className="text-sm text-gray-600">Proper ARIA attributes and keyboard navigation</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🔧 TypeScript</h4>
            <p className="text-sm text-gray-600">Full TypeScript support with proper types</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Focused</h4>
            <p className="text-sm text-gray-600">Consistent focus states with brand colors</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">📝 Validation</h4>
            <p className="text-sm text-gray-600">Built-in error handling and helper text</p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">🔄 Reusable</h4>
            <p className="text-sm text-gray-600">Consistent API across all input types</p>
          </div>
        </div>
      </div>
    </div>
  );
}
