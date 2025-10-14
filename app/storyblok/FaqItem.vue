<template>
  <div :class="props.isOpen ? 'bg-gradient-to-l from-white to-[#F0F5FB]' : 'bg-white'">
    <h3>
      <button
          class="w-full text-left flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800"
          :aria-expanded="props.isOpen"
          :aria-controls="contentId"
          :class="!props.isOpen ? 'hover:bg-neutral-50 cursor-pointer' : ''"
          @click="!props.isOpen ? $emit('toggle') : undefined">
        <span
            class="text-sm sm:text-base md:text-lg font-semibold"
            :class="props.isOpen ? 'text-primary' : 'text-stone-900'"
        >
          {{ props.blok.question }}
        </span>

        <span
            class="inline-flex shrink-0 transition-transform"
            :class="props.isOpen ? 'rotate-180 text-primary' : 'rotate-0'"
            aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
    </h3>

    <div
        v-if="props.isOpen"
        :id="contentId"
        class="text-sm sm:text-base px-4 sm:px-6 pb-5"
        role="region">
      <RichTextView :doc="props.blok.answer" :blok="props.blok" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { FaqItemContent } from '~/content'
import RichTextView from '~/components/RichText.vue'

export type FaqItemProps = {
  blok: FaqItemContent
  isOpen: boolean
}
const props: FaqItemProps = defineProps({
  blok: { type: Object as PropType<FaqItemContent>, required: true },
  isOpen: { type: Boolean as PropType<boolean>, required: true },
})
defineEmits<{ (e: 'toggle'): void }>()

const contentId: string = `faq-${props.blok._uid}-content`
</script>
