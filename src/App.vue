<template>
  <a class="skip-link" href="#main">Skip to main content</a>

  <HeaderComponent />

  <main id="main" ref="mainEl" tabindex="-1">
    <!-- `route.path` as key restarts the transition on every navigation. -->
    <RouterView v-slot="{ Component, route: matched }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="matched.path" />
      </Transition>
    </RouterView>
  </main>

  <FooterComponent />
</template>

<script setup>
import { nextTick, useTemplateRef, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const route = useRoute()
const mainEl = useTemplateRef('mainEl')

/**
 * An SPA swaps the view without moving focus, so a screen reader stays parked on
 * the link that was just activated. Moving focus to <main> makes the new page
 * the next thing announced and the next thing tabbed through.
 *
 * `preventScroll` leaves the scroll position to the router's `scrollBehavior`.
 */
watch(
  () => route.path,
  async () => {
    await nextTick()
    mainEl.value?.focus({ preventScroll: true })
  }
)
</script>

<style scoped>
main {
  position: relative;
  /* Matches `.section-panel`. Without it `<main>` collapses to 0px mid-transition
     and while a lazy view's chunk is in flight, yanking the footer up and back. */
  min-height: 100vh;
}

/* Focus is moved here on navigation; a ring around the whole page is not wanted. */
main:focus {
  outline: none;
}

.page-enter-active,
.page-leave-active {
  transition: opacity var(--dur-fast) var(--ease);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
