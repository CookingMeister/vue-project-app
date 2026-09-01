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
  gap: 0.75rem;
  padding: 1.25rem 0;
  border-bottom: var(--border-hairline);
}

.skill-row__label {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  color: var(--c-accent);
}

.skill-row__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
}

/* Resume tags are intentionally quieter than project tags: they organize a
   dense reference list rather than advertising individual technologies. */
.chip {
  background: rgba(0, 0, 0, 0.16);
  border-color: rgba(250, 235, 215, 0.2);
  border-radius: var(--radius-md);
}

/* Label moves into its own column, so each category reads as one line. */
@media (min-width: 768px) {
  .skill-row {
    grid-template-columns: 14rem minmax(0, 1fr);
    gap: 1.5rem;
    align-items: baseline;
  }

  .skill-row__label {
    /* Nudged down to sit optically level with the first row of chips. */
    padding-top: 0.3rem;
  }
}
</style>
