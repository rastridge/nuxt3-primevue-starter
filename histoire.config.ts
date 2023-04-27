import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import { HstNuxt } from '@histoire/plugin-nuxt'

export default defineConfig({
  plugins: [
    HstVue(),
    HstNuxt()
  ],
  // workaround -  unocss integration from nuxt did not work ...
  setupFile: 'histoire.setup.ts'
})
