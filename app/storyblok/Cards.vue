<template>
  <div
      class="self-stretch px-5 py-10 md:px-20 md:py-24 bg-neutral-100 items-center flex flex-col"
      v-editable="props.blok">
    <div class="max-w-6xl flex flex-col gap-10">
      <div
          class="self-stretch flex-1 inline-flex flex-col justify-center items-start gap-2">
        <RichTextView :doc="props.blok.description" :blok="props.blok" />
      </div>
      <div
          class="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row">
        <slot
            v-for="card in blok.cards"
        >
          <Card :blok="card" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import RichTextView from '~/components/RichText.vue'
import type { CardsContent } from '~/content'
import Card from './Card.vue'

export type CardsProps = {
  blok: CardsContent
}

const props: CardsProps = defineProps({
  blok: {
    type: Object as PropType<CardsContent>,
    required: true,
  },
})
</script>
