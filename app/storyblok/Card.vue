<template>
  <div
      :class="`flex flex-col justify-start items-start gap-4 bg-white rounded-[20px] p-4 sm:p-6 ${props.className}`"
      v-editable="props.blok">
    <slot v-if="props.blok.icon">
      <img
          class="box-content p-2 w-10 h-10 sm:w-[34px] sm:h-[34px]"
          :src="props.blok.icon?.filename"
          :alt="props.blok.icon?.alt ?? ''"
          :width="34"
          :height="34"
      />
    </slot>

    <RichTextView :doc="props.blok.description" :blok="props.blok" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { CardContent } from '~/content'
import RichTextView from '~/components/RichText.vue'

export type CardProps = {
  blok: CardContent
  className?: string
}

const props: CardProps = defineProps({
  blok: {
    type: Object as PropType<CardContent>,
    required: true,
  },
  className: {
    type: String as PropType<string>,
    required: false,
    default: '',
  },
})
</script>
