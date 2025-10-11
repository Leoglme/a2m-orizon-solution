<template>
  <div
      class="rich-text flex flex-col justify-start items-start gap-2"
      v-html="renderedContent"
      v-editable="blok"
  />
</template>

<script setup lang="ts">
import { richTextResolver } from '@storyblok/richtext';
import type { PropType } from 'vue';
import type { StoryblokRichTextNode } from '@storyblok/richtext';
import type { Content } from '~/content';
import type { RichTextContent } from '~/delivery-api';

const resolver: {
  render: (node: StoryblokRichTextNode<string>) => string
} = richTextResolver<string>();
const renderRichText = (node: StoryblokRichTextNode<string> | RichTextContent): string => {
  const result = resolver.render(node as StoryblokRichTextNode<string>);
  return result ?? '';
};

export type RichTextProps = {
  doc: RichTextContent;
  blok: Content;
};

const props: RichTextProps = defineProps({
  doc: {
    type: Object as PropType<RichTextContent>,
    required: true,
  },
  blok: {
    type: Object as PropType<Content>,
    required: true,
  },
});
const renderedContent: string = renderRichText(props.doc);
</script>
