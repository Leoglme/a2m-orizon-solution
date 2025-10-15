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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
</template>


<script setup lang="ts">
import type {PropType} from "vue";

export type MapPinIconProps = {
  className?: string
}

const props: MapPinIconProps = defineProps({
  className: {
    type: String as PropType<string>,
    required: false,
    default: undefined,
  },
})
</script>
