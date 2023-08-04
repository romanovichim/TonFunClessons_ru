# vite-plugin-node-stdlib-browser

> Disclaimer: I've only tested this plugin in simple projects. If you encounter any issues, please open an issue with a minimal reproduction in the project repository.

Add browser polyfills of Node.js built-in libraries for Vite projects. Based on [node-stdlib-browser](https://github.com/niksy/node-stdlib-browser).

## Usage

```sh
npm add node-stdlib-browser
npm add -D vite-plugin-node-stdlib-browser
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

export default defineConfig({
  plugins: [nodePolyfills()]
})
```

## Notes

* `node:` protocol imports are not supported yet.
* The plugin only polyfills the dependencies, not the user code. This is intentional because you shouldn't rely on Node.js built-in libraries in the browser.

## Alternatives

* [`vite-plugin-node-polyfills`](https://github.com/voracious/vite-plugin-node-polyfills) is a similar plugin that is also based on `node-stdlib-browser`, but supports `node:` protocol imports.
* Another alternative is to use a combination of esbuild plugins (for dev server) and Rollup plugins (for production build) to polyfill Node.js built-in libraries. An example configuration is available at https://gist.github.com/FbN/0e651105937c8000f10fefdf9ec9af3d.
