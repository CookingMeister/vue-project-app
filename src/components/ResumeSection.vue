<template>
  <section id="Resume" class="section-panel">
    <div class="container px-4">
      <h1 class="fs-2 section-title">Resume</h1>
      <div class="section-rule"></div>

      <Transition name="fade" appear>
        <div>
          <div class="resume__intro">
            <p class="resume__lead">
              Legacy and modern codebases, plus the infrastructure I run for myself. Grouped by what
              I reach for, not by how long ago I learned it.
            </p>
            <DownloadLink />
          </div>

          <h2 class="resume__heading">Skills</h2>

          <ul class="skill-list list-unstyled">
            <SkillList
              v-for="category in skillCategories"
              :key="category.id"
              :title="category.title"
              :skills="category.skills"
            />
          </ul>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import DownloadLink from './DownloadLink.vue'
import SkillList from './SkillList.vue'
import { skillCategories } from '@/data/site.js'
</script>

<style scoped>
.resume__intro {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.resume__lead {
  flex: 1 1 22rem;
  max-width: 40rem;
  margin: 0;
  color: var(--c-cream);
  opacity: 0.9;
  line-height: 1.6;
}

.resume__heading {
  margin: 0 0 1.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-cream);
  text-shadow: var(--text-shadow-title);
}

.skill-list {
  width: 100%;
  max-width: 72rem;
  margin: 0;
  /* Matching rules close the list and keep the flat layout visually anchored. */
  border-top: var(--border-hairline);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-slow) var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
