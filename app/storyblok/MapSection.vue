<template>
  <section :class="sectionClasses" v-editable="props.blok">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Colonne gauche -->
      <div class="flex flex-col gap-6">
        <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {{ props.blok.title || 'Mon secteur d’intervention' }}
        </h2>

        <slot v-if="props.blok.description">
          <RichTextView :doc="props.blok.description" :blok="props.blok" />
        </slot>

        <div v-if="props.blok.button?.[0]" class="pt-2">
          <Button :blok="props.blok.button[0]" />
        </div>
      </div>
      <div>
        <Map v-if="props.blok.map?.[0]" :blok="props.blok.map[0]" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { MapSectionContent } from '~/content'
import RichTextView from '~/components/RichText.vue'
import Button from './Button.vue'
import Map from './Map.vue'

export type MapSectionProps = { blok: MapSectionContent }
const props: MapSectionProps = defineProps({
  blok: { type: Object as PropType<MapSectionContent>, required: true },
})

const sectionClasses: string = `w-full px-4 py-10 sm:px-8 sm:py-16 md:px-20 md:py-24 ${
    props.blok.backgroundColor === 'grey' ? 'bg-neutral-100'
        : props.blok.backgroundColor === 'white' ? 'bg-white'
            : 'bg-neutral-100'
}`
</script>
