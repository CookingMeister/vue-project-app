<template>
  <svg
    class="app-icon"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="currentColor"
    :role="title ? 'img' : undefined"
    :aria-hidden="title ? undefined : 'true'"
    :aria-label="title || undefined"
  >
    <path
      v-for="(d, i) in icon.paths"
      :key="i"
      :d="d"
      :fill-rule="icon.fillRule"
      :clip-rule="icon.fillRule"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { ICONS } from '@/data/icons.js'

const { name, size, title } = defineProps({
  /** Key of the icon to render. */
  name: {
    type: String,
    required: true,
    validator: (value) => value in ICONS
  },
  /** Rendered width and height, in any CSS length unit. */
  size: {
    type: [String, Number],
    default: '1em'
  },
  /** Accessible name. Leave unset for decorative icons, which are then hidden
   * from assistive technology rather than announced. */
  title: {
    type: String,
    default: ''
  }
})

const icon = computed(() => ICONS[name] ?? ICONS.arrowRight)
</script>

<style scoped>
.app-icon {
  display: inline-block;
  vertical-align: -0.125em;
  flex-shrink: 0;
}
</style>
