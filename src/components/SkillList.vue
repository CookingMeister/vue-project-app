<template>
  <li class="skill-row">
    <h3 class="skill-row__label">{{ title }}</h3>
    <ul class="skill-row__chips list-unstyled">
      <li v-for="skill in skills" :key="skill" class="chip">{{ skill }}</li>
    </ul>
  </li>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  skills: { type: Array, required: true }
})
</script>

<style scoped>
/* Flat rows: structure comes from the hairline rule and label column, so the
   list reads as a spec sheet rather than a deck of cards. */
.skill-row {
  display: grid;
  gap: 0.65rem;
  padding: 1.05rem 0;
  border-bottom: var(--border-hairline);
}

.skill-row:last-child {
  border-bottom: none;
}

.skill-row__label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-accent);
}

.skill-row__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
}

/* Label moves into its own column, so each category reads as one line. */
@media (min-width: 768px) {
  .skill-row {
    grid-template-columns: 12rem minmax(0, 1fr);
    gap: 1.5rem;
    align-items: baseline;
  }

  .skill-row__label {
    /* Nudged down to sit optically level with the first row of chips. */
    padding-top: 0.3rem;
  }
}
</style>
