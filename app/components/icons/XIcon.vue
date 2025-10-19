<template>
  <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="props.className">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

export type XIconProps = {
  className?: string
}

const props: XIconProps = defineProps({
  className: {
    type: String as PropType<string>,
    required: false,
    default: undefined,
  },
})
</script>
