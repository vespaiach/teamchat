import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERB_MAPS = {
  'frontend/src/sign-in/index.tsx': path.resolve(__dirname, '../app/views/signin/new.html.erb'),
  'frontend/src/sign-up/index.tsx': path.resolve(__dirname, '../app/views/signup/new.html.erb'),
  'frontend/src/homes/index.tsx': path.resolve(__dirname, '../app/views/homes/show.html.erb'),
  'frontend/src/channels/index.tsx': path.resolve(__dirname, '../app/views/channels/show.html.erb'),
  'frontend/src/forgot-password/index.tsx': path.resolve(__dirname, '../app/views/password_resets/new.html.erb'),
  'frontend/src/reset-password/index.tsx': path.resolve(__dirname, '../app/views/password_resets/edit.html.erb'),
  'frontend/src/check-email/index.tsx': path.resolve(__dirname, '../app/views/password_resets/instructions_sent.html.erb'),
  'frontend/src/password-reset-expired/index.tsx': path.resolve(__dirname, '../app/views/password_resets/expired.html.erb'),
};

const htmlInject = {
  name: 'html-inject',
  setup(build) {
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

        const erbFilePath = ERB_MAPS[meta.entryPoint];
        const erbContent = fs.readFileSync(erbFilePath, 'utf-8');
        const updatedContent = erbContent.replace(
          /<!--\s*BUNDLE_START\s*-->[\s\S]*?<!--\s*BUNDLE_END\s*-->/,
          `<!-- BUNDLE_START -->
<%= content_for :head do %>
${modules}
<% end %>
<!-- BUNDLE_END -->`
        );
        fs.writeFileSync(erbFilePath, updatedContent);
        console.log(`Updated ${erbFilePath} with new modules.`);
      });
    });
  },
};

function trackFileChangesPlugin() {
  const previousOutputs = new Map(); // entryKey -> { filePath, hash }

  const plugin = {
    name: 'log-replaced-files',
    setup(build) {
      build.onEnd((result) => {
        if (!result.metafile) {
          console.warn('[log-replaced-files] No metafile available.');
          return;
        }

        const changes = [];

        for (const outputFile of Object.keys(result.metafile.outputs)) {
          try {
            const content = fs.readFileSync(outputFile);
            const hash = crypto.createHash('sha1').update(content).digest('hex');
            const outputMeta = result.metafile.outputs[outputFile];

            // Use the entryPoint as the key, or the outputFile if no entryPoint
            const entryKey = outputMeta.entryPoint || outputFile;

            const prev = previousOutputs.get(entryKey);

            if (prev?.filePath && (prev.hash !== hash || prev.filePath !== outputFile)) {
              changes.push({
                old: prev.filePath,
                new: outputFile,
              });
            }

            previousOutputs.set(entryKey, { filePath: outputFile, hash });
          } catch {
            // File might not exist yet
          }
        }

        if (changes.length > 0) {
          console.log('[log-replaced-files] File replacements:');
          console.log(changes);

          // make api call to POST https://localhost:5000/hot_reload to submit changes
          fetch('http://localhost:5000/hot_reload', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .catch((error) => {
              console.error('[log-replaced-files] Error submitting changes:', error);
            })
        }
      });
    },
  };
  return plugin;
}

const ctx = await esbuild.context({
  entryPoints: Object.keys(ERB_MAPS),
  bundle: true,
  outdir: 'public/assets/',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  metafile: true,
  sourcemap: true,
  splitting: true,
  plugins: [htmlInject],
  entryNames: '[dir]-[hash]',
  chunkNames: 'common-[hash]',
  assetNames: 'assets/[name]-[hash]',
});

await ctx.watch();

console.log(`👀 Watching for changes...`);
