<template>
  <a class="btn btn-outline-info rounded-pill px-4 download-link" :href="resumeFile" download>
    <AppIcon name="download" class="me-2" />
    Download Resume
  </a>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { resumeFile } from '@/data/site.js'
</script>

<style scoped>
.download-link {
  flex: 0 0 auto;
  white-space: nowrap;
  transition:
    transform var(--dur-base) var(--ease),
    box-shadow var(--dur-base) var(--ease);
}

.download-link:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
