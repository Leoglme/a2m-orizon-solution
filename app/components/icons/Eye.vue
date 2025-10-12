<template>
  <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#908e97"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="props.className">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
</template>

<script setup lang="ts">
import type {PropType} from "vue";

export type EyeIconProps = {
  className?: string
}

const props: EyeIconProps = defineProps({
  className: {
    type: String as PropType<string>,
    required: false,
    default: undefined,
  },
})
</script>
