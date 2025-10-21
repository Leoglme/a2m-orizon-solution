<template>
  <section
      :id="props.blok.sectionId"
      :class="`self-stretch ${backgroundColor(
      props.blok.backgroundColor,
    )} flex justify-center`"
      v-editable="props.blok">
    <div
        :class="`w-full gap-10 sm:gap-0 ${
        props.blok.imagePadding ? 'px-6 md:px-10 pb-24 pt-10 sm:py-10' : 'p-0'
      } ${rootAlignment(props.blok)} flex-wrap justify-between max-w-[1500px]
        ${props.blok.layoutPosition === 'center' ? 'sm:pt-0!': undefined}
      `"
    >
      <div
          :class="`
          flex-1 p-0 md:p-12 lg:px-20 lg:py-25 inline-flex flex-col justify-center
          ${layoutPosition(props.blok)} ${props.blok.layoutPosition === 'center' ? 'lg:pt-20!': undefined}`"
      >

        <div ref="textRef">
          <RichTextView
              :doc="props.blok.description"
              :blok="props.blok"
          />
        </div>

        <div
            v-if="props.blok.buttons && props.blok.buttons.length > 0"
            class="flex gap-2 md:gap-4 flex-wrap items-center mt-4 w-full sm:w-auto">
          <slot
              v-for="button in props.blok.buttons">
              <Button className="w-full sm:w-auto" :blok="button" />
          </slot>
        </div>
      </div>
      <slot v-if="props.blok.image">
        <div
            :class="`relative flex-1 overflow-hidden min-h-[400px] md:min-h-[650px] ${
            props.blok.imagePadding
              ? 'rounded-xl max-h-[60vw] min-h-[40vw] md:max-h-[800px]'
              : 'rounded-none max-h-[100%] min-h-[40vw] md:min-h-[100%]'
          } `"
        >
          <img
              ref="imgRef"
              :src="props.blok.image?.filename"
              :alt="props.blok.image?.alt ?? ''"
              :width="1200"
              :height="650"
              :class="`absolute h-full w-full object-cover rounded-xl`"
          />
        </div>
      </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {PropType, Ref} from 'vue'
import type {HeroContent, AnimationSettingsContent} from '~/content'
import { ref, onMounted } from 'vue'
import RichTextView from '~/components/RichText.vue'
import { GsapService } from '~/services/gsapService'
import Button from './Button.vue'
import {backgroundColor} from './backgroundColorClass'

const rootAlignment = (content: HeroContent): string => {
  if (!content.image) {
    return 'flex flex-col md:flex-col'
  }
  switch (content.layoutPosition) {
    case 'left':
      return 'flex flex-col lg:flex-row'
    case 'right':
      return 'flex flex-col lg:flex-row-reverse'
    case 'center':
      return 'flex flex-col lg:flex-col'
  }
}
const layoutPosition = (content: HeroContent): string => {
  if (!content.image) {
    return 'items-center'
  }
  switch (content.layoutPosition) {
    case 'left':
    case 'right':
      return 'items-start'
    case 'center':
      return 'items-center'
  }
}

export type HeroProps = {
  blok: HeroContent
}

const props: HeroProps = defineProps({
  blok: {
    type: Object as PropType<HeroContent>,
    required: true,
  },
})

/* -------- Refs pour GSAP -------- */
const textRef: Ref<HTMLElement | null> = ref(null)
const imgRef: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  const textAnimBlk: AnimationSettingsContent | undefined = props.blok.textAnimation?.[0]

  if (textRef.value && textAnimBlk && textAnimBlk.enabled) {
    GsapService.animate(textRef.value, textAnimBlk) // ex: type 'slide-up'
  }

  const imgAnimBlk: AnimationSettingsContent | undefined = props.blok.imageAnimation?.[0]

  if (imgRef.value && imgAnimBlk && imgAnimBlk.enabled) {
    // if anim type is slide-left or slide-right, inferior screen width 1024px, change to slide-up
    if ((imgAnimBlk.type === 'slide-left' || imgAnimBlk.type === 'slide-right') && window.innerWidth < 1024) {
      imgAnimBlk.type = 'slide-up'
    }

    GsapService.animate(imgRef.value, imgAnimBlk)
  }
})
</script>
