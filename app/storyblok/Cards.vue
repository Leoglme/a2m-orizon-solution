<template>
  <div
      class="self-stretch px-5 py-10 md:px-20 md:py-24 items-center flex flex-col"
      :class="backgroundColor(props.blok.backgroundColor)"
      v-editable="props.blok">
    <div class="max-w-6xl flex flex-col gap-10">
      <div
          class="self-stretch flex-1 inline-flex justify-center items-start flex-col md:flex-row gap-2">
        <RichTextView :doc="props.blok.description" :blok="props.blok" />
        <slot
            v-if="props.blok.button"
            v-for="button in props.blok.button"
        >
          <BlockButton v-if="button" :blok="button" class="min-w-fit" />
        </slot>
      </div>
      <div
          class="self-stretch grid justify-start items-stretch gap-4 md:gap-6 flex-col md:grid-cols-3">
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
import BlockButton from "~/storyblok/Button.vue";
import {backgroundColor} from "~/storyblok/backgroundColorClass";

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
