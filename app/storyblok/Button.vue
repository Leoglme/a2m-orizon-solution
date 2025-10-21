<template>
  <div
      v-if="props.blok"
      :class="className"
      ref="buttonRef">
    <A2MButton
        :class="className"
        :to="to"
        :size="props.blok.size"
        :backgroundColor="backgroundColor"
        :backgroundHoverColor="backgroundHoverColor"
        :disabled="false"
    >
      {{ props.blok.text }}
      <slot />
    </A2MButton>
  </div>
</template>

<script setup lang="ts">
import type { PropType, ComputedRef, Ref } from 'vue'
import type {AnimationSettingsContent, ButtonContent} from '~/content'
import type { LinkContent } from "~/delivery-api";
import { computed, ref, onMounted } from 'vue'
import A2MButton from '~/components/core/A2MButton.vue'
import { GsapService } from '~/services/gsapService'

export type ButtonProps = {
  blok: ButtonContent
  className?: string
}
const props: ButtonProps = defineProps({
  blok: { type: Object as PropType<ButtonContent>, required: true },
  className: { type: String as PropType<string>, default: null },
})

const buttonRef: Ref<HTMLElement | null> = ref(null)

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


onMounted(() => {
  const btnAnimBlk: AnimationSettingsContent | undefined = props.blok.animation?.[0]

  if (buttonRef.value && btnAnimBlk && btnAnimBlk.enabled) {
    GsapService.animate(buttonRef.value, btnAnimBlk)
  }
})
</script>
