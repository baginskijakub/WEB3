// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/eslint', '@pinia/nuxt'],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  nitro: {
    experimental: {
      websocket: true,
    },
  },
})
