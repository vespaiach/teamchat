import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERB_MAPS = {
  'frontend/src/sign-in/index.tsx': path.resolve(__dirname, '../app/views/signin/new.html.erb'),
  'frontend/src/sign-up/index.tsx': path.resolve(__dirname, '../app/views/signup/new.html.erb'),
  'frontend/src/homes/index.tsx': path.resolve(__dirname, '../app/views/homes/show.html.erb'),
  'frontend/src/channels/index.tsx': path.resolve(__dirname, '../app/views/channels/show.html.erb'),
  'frontend/src/forgot-password/index.tsx': path.resolve(__dirname, '../app/views/password_resets/new.html.erb'),
  'frontend/src/reset-password/index.tsx': path.resolve(__dirname, '../app/views/password_resets/edit.html.erb'),
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
        const erbContent = fs.readFileSync(erbFilePath, 'utf-8')
        const updatedContent = erbContent.replace(
          /<!--\s*BUNDLE_START\s*-->[\s\S]*?<!--\s*BUNDLE_END\s*-->/,
          `<!-- BUNDLE_START -->
<%= content_for :head do %>
${modules}
<% end %>
<!-- BUNDLE_END -->`
        )
        fs.writeFileSync(erbFilePath, updatedContent)
      });
    });
  },
};

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
