import * as esbuild from 'esbuild';

let ctx = await esbuild.context({
  entryPoints: ['./src/chat-room/index.tsx', './src/home/index.tsx', './src/react-shim.tsx'],
  bundle: true,
  outdir: '../public',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  sourcemap: true,
  chunkNames: 'react-[hash]',
  splitting: true,
});

await ctx.watch();

console.log(`👀 Watching for changes...`);
