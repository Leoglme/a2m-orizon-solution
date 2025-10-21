<template>
  <div class="flex" ref="cardRef">
    <component
        :is="componentType"
        :to="isLink ? to : undefined"
        :class="`flex flex-col justify-start items-start gap-1 bg-white rounded-[20px] p-4 sm:p-6
      border-2 border-transparent ${isLink ? 'cursor-pointer hover:border-stone-900 transition-all duration-300 ease-in-out hover:shadow-md' : undefined}
      ${props.className}`"
        v-editable="props.blok">
      <slot v-if="props.blok.icon">
        <img
            class="box-content w-8 h-8 sm:w-[36px] sm:h-[36px]"
            :src="props.blok.icon?.filename"
            :alt="props.blok.icon?.alt ?? ''"
            :width="36"
            :height="36"
        />
      </slot>

      <RichTextView class="flex-1 sm:text-sm" :doc="props.blok.description" :blok="props.blok"/>

      <slot
          v-if="props.blok.button"
          v-for="button in props.blok.button"
      >
        <BlockButton v-if="button" :blok="button" className="w-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="ml-2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </BlockButton>
      </slot>
    </component>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef, PropType} from 'vue'
import type {LinkContent} from "~/delivery-api";
import type {AnimationSettingsContent, CardContent} from '~/content'
import RichTextView from '~/components/RichText.vue'
import BlockButton from '~/storyblok/Button.vue'
import {computed, ref, onMounted} from 'vue'
import {GsapService} from "~/services/gsapService";

export type CardProps = {
  blok: CardContent
  className?: string
}

/* REFS */
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

/* COMPUTED */
const isLink: ComputedRef<boolean> = computed(() => {
  return !!props.blok.link
})

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

const componentType: ComputedRef<string> = computed(() => {
  if (isLink.value) return 'RouterLink'
  return 'div'
})

/* -------- Refs pour GSAP -------- */
const cardRef: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  const cardAnimBlk: AnimationSettingsContent | undefined = props.blok.animation?.[0]

  if (cardRef.value && cardAnimBlk && cardAnimBlk.enabled) {
    GsapService.animate(cardRef.value, cardAnimBlk) // ex: type 'slide-up'
  }
})
</script>
