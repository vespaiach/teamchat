import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const injectAssetsRegex = /<%=\s*inject_assets\(\s*['"]([^'"]+)['"]\s*\)\s*%>/;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get the mode from command line arguments (default to 'watch')
const mode = process.argv[2] || 'watch';
const isProduction = mode === 'build';

// Function to dynamically generate ERB_MAPS by reading ERB files
function generateErbMaps() {
  const erbMaps = {};
  const viewsDir = path.resolve(__dirname, '../app/views');

  // Function to recursively find all .erb files
  function findErbFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        files.push(...findErbFiles(path.join(dir, item.name)));
      } else if (item.name.endsWith('.html.erb')) {
        files.push(path.join(dir, item.name));
      }
    }

    return files;
  }

  const erbFiles = findErbFiles(viewsDir);

  // Extract inject_assets entries from each ERB file
  for (const erbFile of erbFiles) {
    try {
      const content = fs.readFileSync(erbFile, 'utf-8');
      const injectAssetsMatch = content.match(injectAssetsRegex);

      if (injectAssetsMatch) {
        const entryPoint = injectAssetsMatch[1];
        erbMaps[entryPoint] = erbFile;
      }
    } catch (error) {
      console.warn(`Warning: Could not read ${erbFile}:`, error.message);
    }
  }

  return erbMaps;
}

// Generate ERB_MAPS dynamically
const ERB_MAPS = generateErbMaps();

// Log the discovered mappings for debugging
console.log('📂 Discovered ERB mappings:');
Object.entries(ERB_MAPS).forEach(([entryPoint, erbFile]) => {
  console.log(`  ${entryPoint} → ${path.relative(__dirname, erbFile)}`);
});

const htmlInject = {
  name: 'html-inject',
  setup(build) {
    build.onStart(() => {
      // Clean up public/assets directory before building
      const assetsDir = path.resolve(__dirname, '../public/assets');
      if (fs.existsSync(assetsDir)) {
        fs.rmSync(assetsDir, { recursive: true, force: true });
        console.log('🧹 Cleaned up public/assets directory');
      }
    });

    build.onEnd((result) => {
      if (!result.metafile?.outputs) return;

      const entries = Object.entries(result.metafile.outputs).filter(
        ([key, val]) => key.endsWith('.js') && val.entryPoint
      );
      if (entries.length === 0) return;

      entries.forEach(([output, meta]) => {
        if (!meta.entryPoint) return;

        const entryModule = output.split('/').pop();
        if (!entryModule) return;

        let modules = '';
        modules += `<script type="module" defer src="/assets/${entryModule}"></script>`;
        meta.imports.forEach((dependency) => {
          const fileName = dependency.path.split('/').pop();
          if (!fileName) return;
          modules += `\n<link rel="modulepreload" href="/assets/${fileName}">`;
        });

        // Try to find the matching entry point by converting the relative path
        const normalizedEntryPoint = meta.entryPoint.startsWith('frontend/')
          ? meta.entryPoint
          : `frontend/${meta.entryPoint}`;

        const erbFilePath = ERB_MAPS[normalizedEntryPoint];

        if (!erbFilePath) {
          console.warn(`Warning: No ERB file found for entry point ${meta.entryPoint}`);
          return;
        }

        const erbContent = fs.readFileSync(erbFilePath, 'utf-8');
        const updatedContent = erbContent.replace(
          injectAssetsRegex,
          `<%= content_for :head do %>
${modules}
<% end %>`
        );
        fs.writeFileSync(erbFilePath, updatedContent);
        console.log(`Updated ${erbFilePath} with new modules.`);
      });
    });
  },
};

const manifestGenerator = {
  name: 'manifest-generator',
  setup(build) {
    build.onEnd(async (result) => {
      if (!result.metafile?.outputs) return;

      const entries = Object.entries(result.metafile.outputs).filter(
        ([key, val]) => key.endsWith('.js') && val.entryPoint
      );
      if (entries.length === 0) return;

      // Create manifest file
      const manifest = {
        entryPoints: {},
        timestamp: new Date().toISOString(),
      };

      // Map entry points to their outputs
      entries.forEach(([output, meta]) => {
        if (!meta.entryPoint) return;

        const outputFileName = output.split('/').pop();
        const imports = meta.imports
          .map((dep) => {
            const fileName = dep.path.split('/').pop();
            return fileName
              ? {
                  fileName,
                  path: `/tmp/${fileName}`,
                }
              : null;
          })
          .filter(Boolean);

        // Try to find the matching entry point by converting the relative path
        const normalizedEntryPoint = meta.entryPoint.startsWith('frontend/')
          ? meta.entryPoint
          : `frontend/${meta.entryPoint}`;

        manifest.entryPoints[normalizedEntryPoint] = {
          js: outputFileName,
          path: `/tmp/${outputFileName}`,
          imports,
        };
      });

      // Ensure public/tmp directory exists
      const tmpDir = path.resolve(__dirname, '../public/tmp');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      // Write manifest file
      const manifestPath = path.join(tmpDir, 'manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log(`📝 Updated manifest file: ${manifestPath}`);

      // Send manifest to development API endpoint
      try {
        const response = await fetch('http://localhost:5000/development/manifest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ manifest }),
        });

        if (response.ok) {
          console.log(`📡 Manifest sent to development API successfully`);
        } else {
          console.warn(`⚠️ Failed to send manifest to API: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.warn(`⚠️ Error sending manifest to API:`, error.message);
      }
    });
  },
};

const ctx = await esbuild.context({
  entryPoints: Object.keys(ERB_MAPS).map((entryPoint) => path.resolve(__dirname, '..', entryPoint)),
  bundle: true,
  outdir: isProduction ? 'public/assets/' : 'public/tmp/',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  metafile: true,
  sourcemap: !isProduction, // Disable sourcemap in production
  minify: isProduction, // Enable minification for production builds
  splitting: true,
  plugins: isProduction ? [htmlInject] : [manifestGenerator],
  entryNames: '[dir]-[hash]',
  chunkNames: 'common-[hash]',
  assetNames: 'assets/[name]-[hash]',
  define: {
    'process.env.NODE_ENV': isProduction ? '"production"' : '"development"',
  },
});

if (isProduction) {
  // Production build mode
  await ctx.rebuild();
  console.log('✅ Production build completed!');
  await ctx.dispose();
} else {
  // Development watch mode
  await ctx.watch();
  console.log(`👀 Watching for changes...`);
}
