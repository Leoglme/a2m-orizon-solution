<template>
  <RichText
    :doc="props.blok.text"
    :blok="props.blok"
  />
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { TextBlockContent } from '~/content'
import RichText from '~/components/RichText.vue'


/* TYPES */
export type TextBlockProps = {
  blok: TextBlockContent
}

/* PROPS */
const props: TextBlockProps = defineProps({
  blok: {
    type: Object as PropType<TextBlockContent>,
    required: true,
  },
})
</script>
