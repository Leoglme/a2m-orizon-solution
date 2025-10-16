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
    <polyline points="7 13 12 18 17 13"/>
    <polyline points="7 6 12 11 17 6"/>
  </svg>
</template>


<script setup lang="ts">
import type {PropType} from "vue";

export type DoubleChevronsDownIconProps = {
  className?: string
}

const props: DoubleChevronsDownIconProps = defineProps({
  className: {
    type: String as PropType<string>,
    required: false,
    default: undefined,
  },
})
</script>
