import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import legacy from '@vitejs/plugin-legacy'
const config = defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: '/',
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: '',
        },
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },

    build: {
      minify: true,
    },

    plugins: [
      vue(),
      WindiCSS(),
      Components({
        resolvers: [
          IconsResolver({
            componentPrefix: '',
          }),
        ],
        dts: 'src/components.d.ts',
      }),
      Icons(),
      AutoImport({
        imports: [
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
      }),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),

    ],
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "@/assets/style/main.scss";',
        },
      },
    },
    server: {
      port: 3333,
      hmr: true,
    },
  }
},
)

export default config
