import { createSSRApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router/index.js'

/**
 * Shared app factory. `createSSRApp` on both sides so the client hydrates the
 * prerendered markup instead of throwing it away and re-rendering.
 */
export function createVueApp(history) {
  const router = createAppRouter(history)
  const app = createSSRApp(App).use(router)
  return { app, router }
}
