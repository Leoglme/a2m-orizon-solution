<template>
  <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      :class="props.className"
  >
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

export type HamburgerIconProps = {
  className?: string
}

const props: HamburgerIconProps = defineProps({
  className: {
    type: String as PropType<string>,
    required: false,
    default: undefined,
  },
})
</script>
