import { consumer } from './ws';

interface ManifestEntry {
  js: string;
  path: string;
  imports: ImportEntry[];
}

interface ImportEntry {
  fileName: string;
  path: string;
}

interface Manifest {
  entryPoints: Record<string, ManifestEntry>;
  timestamp: string;
}

function removeExistingModuleElements() {
  // Remove all link tags with rel="modulepreload"
  const modulePreloadLinks = document.querySelectorAll('link[rel="modulepreload"]');
  modulePreloadLinks.forEach(link => link.remove());
  
  // Remove script tags with type="module" (main entrypoint)
  const moduleScripts = document.querySelectorAll('script[type="module"]');
  moduleScripts.forEach(script => script.remove());
}

function addNewModuleElements(manifest: Manifest, entryPoint: string) {
  const entry = manifest.entryPoints[entryPoint];
  if (!entry) {
    console.warn(`Entry point "${entryPoint}" not found in manifest`);
    return;
  }
  
  // Add modulepreload links for imports
  entry.imports.forEach(importEntry => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = importEntry.path;
    document.head.appendChild(link);
  });
  
  // Add the main script tag
  const script = document.createElement('script');
  script.type = 'module';
  script.src = entry.path;
  document.head.appendChild(script);
}

export default function subscribeToDevelopmentChannel(entryPoint: string) {
  return consumer.subscriptions.create(
    { channel: 'DevelopmentChannel' },
    {
      connected: () => {
        console.log('Connected to DevelopmentChannel');
      },
      disconnected: () => {
        console.log('Disconnected from DevelopmentChannel');
      },
      received: (data: Manifest) => {
        console.log('Received development message:', data);
        
        // Step 1: Remove existing modulepreload links and module script tags
        removeExistingModuleElements();
        
        // Step 2: Add new links and scripts from manifest data
        addNewModuleElements(data, entryPoint);
      },
    }
  );
}

