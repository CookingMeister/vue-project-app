import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createVueApp } from './app.js'
import { renderHeadTags, resolveHead } from './head.js'

/** Renders one route to the markup and head tags the prerenderer writes to disk. */
export async function render(url) {
  const { app, router } = createVueApp(createMemoryHistory())

  await router.push(url)
  await router.isReady()

  const html = await renderToString(app)
  return { html, headTags: renderHeadTags(resolveHead(router.currentRoute.value)) }
}
