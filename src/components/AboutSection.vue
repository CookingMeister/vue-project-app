<template>
  <section id="About" class="section-panel about">
    <div class="container">
      <!--
        Source order is heading -> portrait -> copy, the right reading and tab
        order on a phone. Grid areas move the portrait into a left column on wide
        screens without reordering the markup.
      -->
      <div class="about__grid">
        <Transition name="fade-down" appear>
          <div class="about__intro">
            <h1 class="display-5 fw-500">{{ about.heading }}</h1>
            <p class="lead fw-500 mb-0">{{ about.subheading }}</p>
          </div>
        </Transition>

        <Transition name="fade" appear>
          <div class="about__portrait">
            <img
              :src="about.portrait.src"
              :alt="about.portrait.alt"
              class="profile-pic rounded-circle"
              width="320"
              height="320"
              fetchpriority="high"
              decoding="async"
            />
            <p class="about__meta">{{ site.location }}<br />{{ site.domain }}</p>
          </div>
        </Transition>

        <Transition name="fade-up" appear>
          <div class="about__copy">
            <p v-for="(paragraph, i) in about.paragraphs" :key="i">
              {{ paragraph }}
            </p>

            <div class="about__actions">
              <RouterLink class="btn btn-outline-light rounded-pill px-4" to="/portfolio">
                See my work
              </RouterLink>
              <RouterLink class="btn btn-outline-info rounded-pill px-4" to="/contact">
                Get in touch
              </RouterLink>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { about, site } from '@/data/site.js'
</script>

<style scoped>
.about {
  /* One dial for the portrait size at each breakpoint. */
  --portrait-size: clamp(150px, 38vw, 190px);
  /* Only the two-column layout drops the portrait; centred, it stays put. */
  --portrait-offset: 0rem;

  /* Same header-relative rhythm as every other page - see styles.css. */
  padding-top: calc(var(--header-height) + var(--section-lead));
  padding-bottom: 4rem;
  min-height: 90vh;
  color: var(--c-cream);
}

.fw-500 {
  font-weight: 500;
}

/* Mobile: one column, centred. */
.about__grid {
  display: grid;
  gap: 2rem;
  justify-items: center;
  text-align: center;
}

.about__intro h1 {
  margin-bottom: 0.75rem;
}

.about__portrait {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-pic {
  width: var(--portrait-size);
  height: auto;
}

.about__meta {
  margin: 0;
  color: var(--c-cream);
  opacity: 0.85;
  letter-spacing: 0.04em;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Light text on a dark ground blooms, so a lighter weight with extra tracking
   and leading is needed to read as normal body copy. */
.about__copy p {
  font-weight: 200;
  line-height: 1.75;
  letter-spacing: 0.01em;
  margin-bottom: 1.15rem;
  text-align: left;
}

.about__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

/* Wide screens: portrait left, heading and copy stacked on the right. */
@media (min-width: 992px) {
  .about {
    --portrait-size: 13.5rem;
    /* A small drop keeps the portrait from crowding the title without leaving
       a conspicuous blank column above it. */
    --portrait-offset: 1.5rem;
  }

  .about__grid {
    grid-template-columns: minmax(0, var(--portrait-size)) minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'portrait intro'
      'portrait copy';
    column-gap: 3rem;
    row-gap: 1.75rem;
    justify-items: stretch;
    text-align: left;
    align-items: start;
  }

  .about__intro {
    grid-area: intro;
  }

  /* Spans both rows, so it is offset from the heading rather than the copy. */
  .about__portrait {
    grid-area: portrait;
    margin-top: var(--portrait-offset);
  }

  .about__copy {
    grid-area: copy;
    max-width: 46rem;
  }

  .about__actions {
    justify-content: flex-start;
  }
}

.fade-down-enter-active,
.fade-down-leave-active,
.fade-enter-active,
.fade-leave-active,
.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity var(--dur-slow) ease,
    transform var(--dur-slow) ease;
}

.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-80px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
</style>
