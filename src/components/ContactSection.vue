<template>
  <section id="Contact" class="section-panel">
    <div class="container px-4">
      <h1 class="fs-2 section-title">Contact</h1>
      <div class="section-rule"></div>

      <Transition name="fade" appear>
        <div class="row justify-content-center mx-auto w-100">
          <p class="lead text-center mb-5">
            The best way to reach me is on GitHub or LinkedIn &mdash; whichever you prefer.
          </p>

          <div class="col-md-12 col-lg-8">
            <ul class="list-unstyled d-flex flex-column gap-4 mb-0">
              <li v-for="link in socialLinks" :key="link.id">
                <a class="contact-card" :href="link.url" target="_blank" rel="noopener noreferrer">
                  <AppIcon :name="link.icon" size="2rem" />
                  <span class="contact-card__text">
                    <span class="contact-card__name">{{ link.name }}</span>
                    <span class="contact-card__handle">{{ link.handle }}</span>
                    <span class="contact-card__blurb">{{ link.blurb }}</span>
                  </span>
                  <span class="visually-hidden">(opens in a new tab)</span>
                  <AppIcon name="arrowRight" class="contact-card__arrow" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { socialLinks } from '@/data/site.js'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-slow) var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  color: var(--c-cream);
  text-decoration: none;
  background-color: var(--surface-sunken);
  border: var(--border-soft);
  border-radius: var(--radius-md);
  transition:
    color var(--dur-base) var(--ease),
    background-color var(--dur-base) var(--ease),
    border-color var(--dur-base) var(--ease),
    transform var(--dur-base) var(--ease);
}

.contact-card:hover,
.contact-card:focus-visible {
  color: var(--c-accent);
  background-color: var(--surface-scrim);
  border-color: var(--c-accent);
  transform: translateY(-3px);
}

.contact-card__text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  text-align: left;
}

.contact-card__name {
  font-size: 1.15rem;
  font-weight: 600;
}

.contact-card__handle {
  font-size: 0.9rem;
  opacity: 0.75;
}

.contact-card__blurb {
  font-size: 0.85rem;
  opacity: 0.7;
}

.contact-card__arrow {
  margin-left: auto;
  opacity: 0;
  transition:
    opacity var(--dur-base) var(--ease),
    transform var(--dur-base) var(--ease);
}

.contact-card:hover .contact-card__arrow,
.contact-card:focus-visible .contact-card__arrow {
  opacity: 1;
  transform: translateX(4px);
}
</style>
