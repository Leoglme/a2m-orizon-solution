<template>
  <button
      type="button"
      class="flex w-fit cursor-pointer items-center justify-center gap-3 rounded-full border border-gray-700 px-4 py-1 text-center text-sm leading-6 font-normal select-none"
      :class="props.active ? 'bg-primary text-gray-100' : 'bg-transparent text-gray-700'"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  active: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})
</script>
