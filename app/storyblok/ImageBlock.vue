<template>
  <div
      class="w-full my-2 flex items-center"
      :class="containerAlignClass"
      v-editable="props.blok"
  >
    <img
        ref="imgRef"
        v-if="imageSrc"
        :src="imageSrc"
        :alt="props.blok.image?.alt || ''"
        class="h-auto"
        :style="imgStyle"
        loading="lazy"
        decoding="async"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType, Ref, ComputedRef, CSSProperties } from 'vue'
import { computed, onMounted, ref } from 'vue'
import type { ImageBlockContent, AnimationSettingsContent } from '~/content'
import { GsapService } from '~/services/gsapService'


/* TYPES */
export type ImageBlockProps = {
  blok: ImageBlockContent
}

/* PROPS */
const props: ImageBlockProps = defineProps({
  blok: {
    type: Object as PropType<ImageBlockContent>,
    required: true,
  },
})

/* COMPUTED */
const imageSrc: ComputedRef<string | undefined> = computed(() => props.blok.image?.filename || undefined)
const containerAlignClass: ComputedRef<"justify-start" | "justify-end" | "justify-center"> = computed(() => {
  switch (props.blok.align) {
    case 'left':
      return 'justify-start'
    case 'right':
      return 'justify-end'
    default:
      return 'justify-center'
  }
})

const imgStyle: ComputedRef<CSSProperties> = computed(() => {
  const max: number | undefined = props.blok.maxWidth && props.blok.maxWidth > 0 ? props.blok.maxWidth : undefined
  return max ? { maxWidth: `${max}px`, width: '100%' } : { width: '100%', maxWidth: '100%' }
})

/** GSAP */
const imgRef: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  const anim: AnimationSettingsContent | undefined = props.blok.animation?.[0]
  if (imgRef.value && anim?.enabled) {
    GsapService.animate(imgRef.value, anim)
  }
})
</script>
