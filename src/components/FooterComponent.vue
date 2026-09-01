<template>
  <footer id="footer" class="site-footer">
    <div class="site-footer__scrim"></div>
    <div class="container text-light">
      <nav
        class="social d-flex justify-content-center align-items-center gap-3"
        aria-label="Social profiles"
      >
        <a
          v-for="link in socialLinks"
          :key="link.id"
          class="social-link p-3"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon :name="link.icon" size="1.75rem" :title="link.name" />
          <span class="visually-hidden">(opens in a new tab)</span>
        </a>
      </nav>
      <p class="mb-0">&copy; {{ currentYear }} {{ site.name }}</p>
    </div>
  </footer>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { site, socialLinks } from '@/data/site.js'

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24vh;
  padding: 2rem 0;
  text-align: center;
  font-size: 85%;
  background-image: url('/img/Designer.png');
  background-position: center;
}

.site-footer__scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  backdrop-filter: blur(4px);
  background-color: var(--surface-scrim);
}
</style>
