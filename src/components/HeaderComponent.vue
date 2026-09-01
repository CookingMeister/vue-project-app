<template>
  <header ref="headerEl" class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <div class="site-header__scrim"></div>

    <RouterLink to="/" class="site-header__brand" :aria-label="`${site.brand} - home`">
      <img
        :src="brandIcon"
        alt=""
        class="site-header__logo"
        width="52"
        height="36"
        aria-hidden="true"
      />
      <span class="fs-4 mx-2">{{ site.brand }}</span>
    </RouterLink>

    <nav aria-label="Main">
      <ul class="nav nav-pills">
        <NavLink v-for="item in navItems" :key="item.url" :url="item.url" :name="item.name" />
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { RouterLink } from 'vue-router'
import NavLink from './NavLink.vue'
import { site } from '@/data/site.js'

const brandIcon = '/img/fullstackchef.png'

const navItems = [
  { url: '/', name: 'About' },
  { url: '/portfolio', name: 'Portfolio' },
  { url: '/resume', name: 'Resume' },
  { url: '/contact', name: 'Contact' }
]

const isScrolled = ref(false)
const headerEl = useTemplateRef('headerEl')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

/**
 * Publishes the header's real height as `--header-height` on :root, which page
 * sections use to reserve space. A fixed value goes stale as soon as the header
 * grows - most visibly on narrow screens, where `flex-wrap` drops the nav onto a
 * second line and page titles slide underneath it.
 */
const measureHeader = () => {
  const height = headerEl.value?.offsetHeight
  if (height) {
    document.documentElement.style.setProperty('--header-height', `${height}px`)
  }
}

let observer = null

onMounted(() => {
  // `passive`: this listener never calls preventDefault, so scrolling can stay
  // on the compositor thread.
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  measureHeader()

  // Re-measure on wrap, font load or zoom, falling back to the one-time
  // measurement above where ResizeObserver is unavailable.
  if (typeof ResizeObserver !== 'undefined' && headerEl.value) {
    observer = new ResizeObserver(measureHeader)
    observer.observe(headerEl.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observer?.disconnect()
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 26px 1rem;
  font-weight: 500;
  background-image: url('/img/Designer.png');
  background-position: center;
}

.site-header__scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  backdrop-filter: blur(4px);
  background-color: var(--surface-scrim);
}

.site-header__brand {
  display: flex;
  align-items: center;
  margin-right: auto;
  color: var(--c-cream);
  text-decoration: none;
  transition: color var(--dur-base) var(--ease);
}

.site-header__logo {
  width: 3.25rem;
  height: 2.25rem;
  object-fit: contain;
  mix-blend-mode: screen;
}

.site-header--scrolled .site-header__brand {
  color: var(--c-accent);
}
</style>
