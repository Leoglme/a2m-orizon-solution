<template>
  <a
      v-if="isExternalLink"
      class="inline-flex cursor-pointer items-center gap-x-1.5 font-semibold decoration-2 underline-offset-4 hover:underline text-base"
      :href="href"
      :style="{ color: props.color }"
  >
    <slot />
  </a>
  <nuxt-link
      v-else
      :to="props.link"
      class="inline-flex cursor-pointer items-center gap-x-1.5 font-semibold decoration-2 underline-offset-4 hover:underline text-base"
      :style="{ color: props.color }"
  >
    <slot />
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { defineProps } from '@vue/runtime-core'
import { computed } from 'vue'

/**
 * Type definitions for the A2MLink component props
 * @type {A2MLinkProps}
 * @property {string} link - The link to navigate to
 * @property {string} [color] - Optional color for the link, defaults to primary color if not provided
 */
export type A2MLinkProps = {
  link: string
  color?: string
}

/**
 * Type definitions for the A2MLink component props
 * @type {A2MLinkProps}
 * @property {string} link - The link to navigate to
 * @property {string} [color] - Optional color for the link, defaults to primary color if not provided
 */
const props: A2MLinkProps = defineProps({
  link: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#004AAD',
  },
})

const isExternalLink: ComputedRef<boolean> = computed(() => {
  return /^(https?|tel|mailto):\/\/|^\/\//.test(props.link.trim())
})

const href: ComputedRef<string | undefined> = computed(() => {
  if (isExternalLink.value) {
    return String(props.link)
  }
  return undefined
})
</script>
