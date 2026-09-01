<template>
  <article class="col">
    <div class="work-card h-100" :class="{ 'work-card--media': image }">
      <!-- A screenshot when there is one, otherwise a slim banner. -->
      <img
        v-if="image"
        class="work-card__media"
        :src="image"
        :alt="alt"
        width="640"
        height="360"
        loading="lazy"
        decoding="async"
      />
      <!-- The lock tracks closed-source status, not a missing screenshot. -->
      <div v-else class="work-card__banner" aria-hidden="true">
        <AppIcon :name="links.length ? 'journalCode' : 'lock'" size="1.25rem" />
      </div>

      <div class="work-card__body">
        <h3 class="work-card__title h5">{{ title }}</h3>
        <p class="work-card__desc">{{ description }}</p>

        <ul v-if="tags?.length" class="work-card__tags list-unstyled">
          <li v-for="tag in tags" :key="tag" class="chip">{{ tag }}</li>
        </ul>

        <div v-if="links.length" class="work-card__links">
          <a
            v-for="link in links"
            :key="link.url"
            class="work-card__link"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppIcon :name="link.type === 'github' ? 'github' : 'external'" />
            <span>{{ link.type === 'github' ? 'Source' : 'Live demo' }}</span>
            <span class="visually-hidden">for {{ title }} (opens in a new tab)</span>
          </a>
        </div>
        <p v-else class="work-card__closed">
          <AppIcon name="lock" />
          <span>Closed source</span>
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  alt: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  /** Each entry is `{ type: 'github' | 'demo', url }`. Empty means closed source. */
  links: { type: Array, default: () => [] }
})
</script>

<style scoped>
/*
 * Elevation changes on hover, but the card does not move: it is not itself a
 * link - only "Live demo" and "Source" inside it are - so a lift would promise
 * an affordance it does not have.
 */
.work-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  transition: box-shadow var(--dur-base) var(--ease);
}

.work-card:hover,
.work-card:focus-within {
  box-shadow: var(--shadow-hover);
}

.work-card__media {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: top center;
}

/* Screenshot to a side column, so the card's height is set by its body. */
@media (min-width: 576px) {
  .work-card--media {
    flex-direction: row;
  }

  .work-card--media .work-card__media {
    flex: 0 0 38%;
    max-width: 15rem;
    height: auto;
    align-self: stretch;
    aspect-ratio: auto;
  }
}

/* Slim banner for imageless cards: keeps the rhythm without a tall empty plate. */
.work-card__banner {
  display: grid;
  place-items: center;
  min-height: 3.25rem;
  /* Recessed rather than the ground gradient, which would read as a hole
     punched through the card. */
  background: var(--surface-sunken);
  color: var(--c-cream);
  opacity: 0.85;
}

.work-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.1rem 1.25rem 1.25rem;
}

.work-card__title {
  margin: 0;
  color: var(--c-accent);
}

.work-card__desc {
  margin: 0;
  color: var(--c-cream);
  font-size: 0.9rem;
  line-height: 1.45;
}

.work-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
}

/* Pushed to the bottom so link rows align across a row of cards. */
.work-card__links,
.work-card__closed {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: auto 0 0;
  padding-top: 0.5rem;
}

.work-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--c-cream);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color var(--dur-base) var(--ease);
}

.work-card__link:hover,
.work-card__link:focus-visible {
  color: var(--c-accent);
  text-decoration: underline;
}

.work-card__closed {
  align-items: center;
  color: var(--c-cream);
  font-size: 0.85rem;
  opacity: 0.75;
}
</style>
