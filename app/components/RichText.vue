<template>
  <div
      class="rich-text flex flex-col justify-start items-start gap-2"
      v-html="renderRichText(props.doc)"
  ></div>
</template>

<script setup lang="ts">
import { richTextResolver } from '@storyblok/richtext'
import type { PropType } from 'vue'
import type { StoryblokRichTextNode } from '@storyblok/richtext'
const renderRichText: (node: StoryblokRichTextNode<string>) => string
    = richTextResolver<string>().render

export type RichTextProps = {
  doc: StoryblokRichTextNode<string>
}

const props: RichTextProps = defineProps({
  doc: {
    type: Object as PropType<StoryblokRichTextNode<string>>,
    required: true,
  },
})
</script>
