// Bootstrap first so our own tokens and component styles override its defaults.
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'

import { createWebHistory } from 'vue-router'
import { createVueApp } from './app.js'

const { app, router } = createVueApp(createWebHistory(import.meta.env.BASE_URL))

// Wait for the route to resolve so hydration matches the prerendered markup.
router.isReady().then(() => app.mount('#app'))
