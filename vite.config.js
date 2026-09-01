import { existsSync, statSync } from 'node:fs'
import { resolve, sep } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const dist = fileURLToPath(new URL('./dist', import.meta.url))

/**
 * Serves the prerendered `dist/<route>/index.html` in `vite preview`.
 *
 * Preview's SPA fallback otherwise rewrites every path to the root index.html,
 * so prerendered routes look broken locally even though the deployed site is
 * fine. This installs ahead of the fallback and matches what a static web
 * server does: the file on disk wins, and a path with no file is a 404.
 */
function servePrerenderedRoutes() {
  return {
    name: 'serve-prerendered-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const [path] = (req.url ?? '/').split('?')
        if (path === '/') return next()

        const trimmed = path.replace(/\/$/, '')
        const target = resolve(dist, `.${trimmed}`)

        // `resolve` collapses any `..`; refuse anything that escapes dist.
        if (target !== dist && !target.startsWith(dist + sep)) return next()

        if (existsSync(target) && statSync(target).isFile()) {
          return next()
        }

        if (existsSync(resolve(target, 'index.html'))) {
          req.url = `${trimmed}/index.html`
          return next()
        }

        // What nginx does with `try_files ... =404`. The static middleware
        // downstream writes its own 200 when it serves the file, so the status
        // has to be pinned rather than merely assigned.
        if (existsSync(resolve(dist, '404.html'))) {
          req.url = '/404.html'
          const writeHead = res.writeHead.bind(res)
          res.writeHead = (status, ...rest) => writeHead(status === 200 ? 404 : status, ...rest)
          res.statusCode = 404
        }

        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), servePrerenderedRoutes()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
