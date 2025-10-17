<template>
  <label :for="props.id" class="text-base font-semibold tracking-tight text-stone-900">
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'

/**
 * Type definitions for the A2MLabel component props
 * @type {A2MLabelProps}
 * @property {string} id - The id of the label
 */
export type A2MLabelProps = {
  id: string
}

/**
 * Type definitions for the A2MLabel component props
 * @type {A2MLabelProps}
 * @property {string} id - The id of the label
 */
const props: A2MLabelProps = defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>
