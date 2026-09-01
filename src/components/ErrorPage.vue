<template>
  <section class="section-panel error-page">
    <Transition name="slide" appear>
      <div class="container text-center">
        <h1 class="error-page__code">404 &mdash; Page Not Found</h1>
        <p class="mb-4">The page you are looking for is not available.</p>
        <RouterLink class="btn btn-outline-light rounded-pill px-4" to="/">
          Back to home
        </RouterLink>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.error-page {
  padding-top: 30vh;
  min-height: 90vh;
}

.error-page__code {
  color: var(--c-alert);
  text-shadow: var(--text-shadow-title);
}

.slide-enter-active,
.slide-leave-active {
  transition: all var(--dur-base) ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
