<template>
  <div class="rich-text w-full flex flex-col gap-3 sm:gap-2" v-editable="blok">
    <template v-for="(item, i) in flatNodes" :key="i">
      <!-- Embedded Storyblok components -->
      <component
          v-if="item.kind === 'embedded'"
          :is="item.blok.component"
          :blok="item.blok"
      />

      <!-- Rich text fragments rendered as HTML -->
      <div
          v-else-if="item.kind === 'html'"
          v-html="item.html"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { renderRichText } from '@storyblok/vue'
import type { PropType } from 'vue'
import type { Content } from '~/content'
import type { RichTextContent } from '~/delivery-api'

type FlatNode =
    | { kind: 'embedded'; blok: any }
    | { kind: 'html'; html: string }

const props = defineProps({
  doc: { type: Object as PropType<RichTextContent>, required: true },
  blok: { type: Object as PropType<Content>, required: true },
})

/**
 * Helper: render a single richtext node by encapsulating it in a minimal doc.
 * Storyblok's renderRichText expects a full doc, not a single node.
 */
function renderNodeAsHtml(node: any): string {
  return renderRichText({ type: 'doc', content: [node] } as any) ?? ''
}

/**
 * Flatten the richtext content:
 * - For `type: 'blok'`, push EACH embedded blok from `attrs.body` (not just [0])
 * - For any other node, render to HTML chunk
 */
const flatNodes: ComputedRef<FlatNode[]> = computed(() => {
  const content = Array.isArray(props.doc?.content) ? props.doc.content : []
  const out: FlatNode[] = []

  for (const node of content) {
    if (node?.type === 'blok' && Array.isArray(node?.attrs?.body)) {
      for (const embedded of node.attrs.body) {
        // each embedded component is rendered dynamically by name via <StoryblokComponent>
        out.push({ kind: 'embedded', blok: embedded })
      }
    } else {
      // paragraphs, headings, lists, quotes, etc.
      out.push({ kind: 'html', html: renderNodeAsHtml(node) })
    }
  }

  return out
})
</script>
