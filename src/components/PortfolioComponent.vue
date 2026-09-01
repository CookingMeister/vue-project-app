<template>
  <section id="Work" class="section-panel">
    <div class="container px-4">
      <h1 class="fs-2 section-title">Portfolio</h1>
      <div class="section-rule"></div>

      <h2 class="fs-5 portfolio__subhead">Featured work</h2>
      <p class="portfolio__note">
        Professional and proprietary projects. The code is not public, but here is what they are.
      </p>
      <div class="row row-cols-1 row-cols-md-2 align-items-stretch g-4 pb-5 portfolio__grid">
        <WorkCard
          v-for="project in featured"
          :key="project.id"
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :alt="project.alt"
          :tags="project.tags"
          :links="project.links"
        />
      </div>

      <h2 class="fs-5 portfolio__subhead">Open source &amp; personal projects</h2>
      <div class="row row-cols-1 row-cols-md-2 align-items-stretch g-4 pb-4 portfolio__grid">
        <WorkCard
          v-for="project in personal"
          :key="project.id"
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :alt="project.alt"
          :tags="project.tags"
          :links="project.links"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import WorkCard from './WorkCard.vue'
import { projects } from '@/data/site.js'

const featured = projects.filter((project) => project.featured)
const personal = projects.filter((project) => !project.featured)
</script>

<style scoped>
.portfolio__subhead {
  margin: 0;
  color: var(--c-cream);
  text-shadow: var(--text-shadow-title);
}

.portfolio__note {
  margin: 0.4rem 0 0;
  color: var(--c-cream);
  opacity: 0.85;
  font-size: 0.95rem;
}

.portfolio__grid {
  /* On the grid rather than the heading, so heading-only and heading-plus-note
     groups get the same air. */
  margin-top: 2rem;
}
</style>
