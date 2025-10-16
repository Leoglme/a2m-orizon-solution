<template>
  <section
      :id="props.blok.sectionId"
      :class="`self-stretch ${backgroundColor(
      props.blok.backgroundColor,
    )} flex justify-center`"
      v-editable="props.blok">
    <div
        :class="`w-full ${
        props.blok.imagePadding ? 'p-4 md:p-10' : 'p-0'
      } ${rootAlignment(props.blok)} flex-wrap justify-between max-w-[1500px]
        ${props.blok.layoutPosition === 'center' ? 'pt-0!': undefined}
      `"
    >
      <div
          :class="`
          flex-1 p-6 md:p-12 lg:px-20 lg:py-25 inline-flex flex-col justify-center
          ${layoutPosition(props.blok)} ${props.blok.layoutPosition === 'center' ? 'lg:pt-20!': undefined}`"
      >
        <RichTextView
            :doc="props.blok.description"
            :blok="props.blok"
        />
        <div
            v-if="props.blok.buttons && props.blok.buttons.length > 0"
            class="flex gap-2 md:gap-4 flex-wrap items-center mt-4">
          <slot
              v-for="button in props.blok.buttons">
              <Button :blok="button"/>
          </slot>
        </div>
      </div>
      <slot v-if="props.blok.image">
        <div
            :class="`relative flex-1 overflow-hidden md:min-h-[650px] ${
            props.blok.imagePadding
              ? 'rounded-xl max-h-[60vw] min-h-[40vw] md:max-h-[800px]'
              : 'rounded-none max-h-[100%] min-h-[40vw] md:min-h-[100%]'
          } `"
        >
          <img
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
import type {PropType} from 'vue'
import type {HeroContent} from '~/content'
import RichTextView from '~/components/RichText.vue'
import Button from './Button.vue'
import {backgroundColor} from './backgroundColorClass'

const rootAlignment = (content: HeroContent): string => {
  if (!content.image) {
    return 'flex flex-col md:flex-col'
  }
  switch (content.layoutPosition) {
    case 'left':
      return 'flex flex-col md:flex-row'
    case 'right':
      return 'flex flex-col md:flex-row-reverse'
    case 'center':
      return 'flex flex-col md:flex-col'
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
</script>
