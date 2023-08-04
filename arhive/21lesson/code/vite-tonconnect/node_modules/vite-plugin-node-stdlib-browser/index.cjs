const inject = require('@rollup/plugin-inject')
const stdLibBrowser = require('node-stdlib-browser')
const esbuildPlugin = require('node-stdlib-browser/helpers/esbuild/plugin')
const {
  handleCircularDependancyWarning
} = require('node-stdlib-browser/helpers/rollup/plugin')

const plugin = () => ({
  name: 'vite-plugin-node-stdlib-browser',
  config: () => ({
    resolve: {
      alias: stdLibBrowser
    },
    optimizeDeps: {
      include: ['buffer', 'process'],
      esbuildOptions: {
        inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
        define: {
          global: 'global',
          process: 'process',
          Buffer: 'Buffer'
        },
        plugins: [
          esbuildPlugin(stdLibBrowser),

          // https://github.com/remorses/esbuild-plugins/issues/24#issuecomment-1369928859
          {
            name: 'fix-node-stdlib-browser-shim',
            setup (build) {
              build.onResolve(
                { filter: /node-stdlib-browser\/helpers\/esbuild\/shim/ },
                ({ path }) => ({ path })
              )
            }
          }
        ]
      }
    },

    build: {
      rollupOptions: {
        onwarn: (warning, rollupWarn) => {
          handleCircularDependancyWarning(warning, rollupWarn)
        },

        plugins: [
          {
            ...inject({
              global: [
                require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
                'global'
              ],
              process: [
                require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
                'process'
              ],
              Buffer: [
                require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
                'Buffer'
              ]
            })
          }
        ]
      }
    }
  })
})

module.exports = plugin
