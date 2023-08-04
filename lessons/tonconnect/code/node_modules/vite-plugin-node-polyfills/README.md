# vite-plugin-node-polyfills

A Vite plugin to polyfill Node's Core Modules for browser environments. Supports [`node:` protocol imports](https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#node-imports).

### Why do I need this?

```
Module "stream" has been externalized for browser compatibility. Cannot access "stream.Readable" in client code.
```

Since browsers do not support Node's [Core Modules](https://nodejs.org/dist/latest-v16.x/docs/api/modules.html#core-modules), packages that use them must be polyfilled to function in browser environments. In an attempt to prevent runtime errors, Vite produces [errors](https://github.com/vitejs/vite/issues/9200) or [warnings](https://github.com/vitejs/vite/pull/9837) when your code references builtin modules such as `fs` or `path`.

## Getting Started

Install the package as a dev dependency.

```sh
# npm
npm install --save-dev vite-plugin-node-polyfills

# pnpm
pnpm install --save-dev vite-plugin-node-polyfills

# yarn
yarn add --dev vite-plugin-node-polyfills
```

Add the plugin to your `vite.config.ts` file.

```ts
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        'fs', // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
})
```
