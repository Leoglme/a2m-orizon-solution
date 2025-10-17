<template>
  <A2MButton
      v-if="props.blok"
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

const link: ComputedRef<LinkContent | undefined> = computed(() => props.blok?.link)

const isAnchorLink: ComputedRef<boolean> = computed(() => {
  if (!link.value || link.value.linktype !== 'url') return false
  return link.value.url.startsWith('#') && link.value.url.length > 1
})

/** Resolve target URL from Storyblok link */
const to: ComputedRef<string> = computed(() => {
  if (!link.value) return '#'

  switch (link.value.linktype) {
    case 'url':
      if(isAnchorLink.value) {
        return link.value.url
      }
      return link.value.cached_url
    case 'asset':
      return link.value.cached_url
    case 'story':
      return '/' + link.value.cached_url.split('/').slice(1).join('/')
    case 'email':
      return `mailto:${link.value.email}`
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
