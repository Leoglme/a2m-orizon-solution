<template>
  <div class="bg-white">
    <h3>
      <button
          class="w-full text-left flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800"
          :aria-expanded="props.isOpen"
          :aria-controls="contentId"
          @click="$emit('toggle')">
        <span class="text-sm sm:text-base md:text-lg font-semibold">
          {{ props.blok.question }}
        </span>

        <span
            class="inline-flex shrink-0 transition-transform"
            :class="props.isOpen ? 'rotate-180' : 'rotate-0'"
            aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
    </h3>

    <transition name="faq-collapse">
      <div
          v-show="props.isOpen"
          :id="contentId"
          class="px-4 sm:px-6 pb-5 text-sm sm:text-base"
          role="region">
        <RichTextView :doc="props.blok.answer" :blok="props.blok" />
      </div>
    </transition>
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

<style scoped>
.faq-collapse-enter-active,
.faq-collapse-leave-active { transition: max-height 200ms ease, opacity 200ms ease; }
.faq-collapse-enter-from,
.faq-collapse-leave-to { max-height: 0; opacity: 0; }
.faq-collapse-enter-to,
.faq-collapse-leave-from { max-height: 400px; opacity: 1; } /* hauteur max raisonnable */
</style>
