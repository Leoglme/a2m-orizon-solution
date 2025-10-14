<template>
  <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="props.className">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
</template>


<script setup lang="ts">
import type {PropType} from "vue";

export type MailIconProps = {
  className?: string
}

const props: MailIconProps = defineProps({
  className: {
    type: String as PropType<string>,
    required: false,
    default: undefined,
  },
})
</script>
