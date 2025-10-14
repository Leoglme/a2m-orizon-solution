<template>
  <A2MButton
      class="self-center"
      :to="to"
      :size="props.blok.size"
      :backgroundColor="backgroundColor"
      :backgroundHoverColor="backgroundHoverColor"
      :disabled="false"
  >
    {{ props.blok.text }}
    <slot />
  </A2MButton>
</template>

<script setup lang="ts">
import type { PropType, ComputedRef } from 'vue'
import type { ButtonContent } from '~/content'
import type { LinkContent } from "~/delivery-api";
import { computed } from 'vue'
import A2MButton from '~/components/core/A2MButton.vue'

export type ButtonProps = { blok: ButtonContent }
const props: ButtonProps = defineProps({
  blok: { type: Object as PropType<ButtonContent>, required: true },
})

/** Resolve target URL from Storyblok link */
const to: ComputedRef<string> = computed(() => {
  const link: LinkContent | undefined = props.blok.link
  if (!link) return '#'

  switch (link.linktype) {
    case 'url':
    case 'asset':
      return link.cached_url
    case 'story':
      return '/' + link.cached_url.split('/').slice(1).join('/')
    case 'email':
      return `mailto:${link.email}`
    default:
      return '#'
  }
})

/** Color mapping: adapte ici si tu ajoutes d’autres variantes */
const backgroundColor: ComputedRef<string> = computed(() => {
  switch (props.blok.color) {
    case 'secondary':
      return '#EC9E0A'
    case 'primary':
    default:
      return '#004AAD'
  }
})
const backgroundHoverColor: ComputedRef<string> = computed(() => {
  switch (props.blok.color) {
    case 'secondary':
      return '#F1A01E'
    case 'primary':
    default:
      return '#045DC3'
  }
})
</script>
