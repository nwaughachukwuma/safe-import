// set up tsup
import { defineConfig } from 'tsup'



export default defineConfig({
    sourcemap: true,
    clean: true,
    minify: false,
    entry: ['index.ts'],
    format: ['esm', 'cjs'],
    outDir: 'lib',
    target: 'node14',
    treeshake: false,
    esbuildOptions: (options, context) => {
      if (context.format === 'cjs') {
        options.footer = {
            js: 'module.exports = module.exports.default || module.exports;'
        };
      }
    },
    splitting: false,
})