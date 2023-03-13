declare module 'nuxt/schema' {
  interface RuntimeConfig {
    public: {
      DOMAIN_URL: string
    }
  }
}

declare module '*.svg' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

// It is always important to ensure you import/export something when augmenting a type
export {}
