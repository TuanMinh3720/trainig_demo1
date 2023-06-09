// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"

export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@pinia/nuxt", "@nuxt/content"],
  imports: { dirs: ["./stores"] },
  sourcemap: {
    server: false,
    client: false,
  },
  ssr: false,
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
        : ["@juggle/resize-observer"],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
})
