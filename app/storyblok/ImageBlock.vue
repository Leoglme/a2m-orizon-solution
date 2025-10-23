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
        class="image-block h-auto w-full"
        :style="{
        '--img-max': maxPx || '100%',
        '--img-max-sm': '280px'
        }"
        loading="lazy"
        decoding="async"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType, Ref, ComputedRef } from 'vue'
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

// string "1200px" ou undefined
const maxPx: ComputedRef<string | undefined> = computed(() =>
    props.blok.maxWidth && props.blok.maxWidth > 0 ? `${props.blok.maxWidth}px` : undefined
)

/** GSAP */
const imgRef: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  const anim: AnimationSettingsContent | undefined = props.blok.animation?.[0]
  if (imgRef.value && anim?.enabled) {
    GsapService.animate(imgRef.value, anim)
  }
})
</script>


<style scoped>
:root {
  --img-max: 100%;
  --img-max-sm: 280px;
}

.image-block {
  max-width: var(--img-max, 100%);
}

/* ≤ 640px */
@media (max-width: 640px) {
  .image-block {
    max-width: var(--img-max-sm, 280px);
  }
}
</style>
