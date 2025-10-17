<template>
  <section class="min-h-[85vh] flex items-center justify-center w-full" :class="sectionClasses" v-editable="props.blok">
    <div class="w-full px-6 pt-16 pb-24 md:p-10 flex flex-col md:flex-row flex-wrap justify-between max-w-[1500px] gap-16 sm:gap-0">
      <!-- Colonne gauche -->
      <div class="flex-1 md:px-12 lg:px-20 py-4 inline-flex flex-col justify-start
          items-start gap-8 sm:gap-12">
        <h2 class="text-2xl sm:text-[44px] font-extrabold tracking-tight">
          {{ props.blok.title || 'Notre secteur d’intervention' }}
        </h2>

        <!-- Variante description -->
        <slot v-if="props.blok.layout === 'description' && props.blok.description">
          <RichTextView :doc="props.blok.description" :blok="props.blok" />
        </slot>

        <!-- Variante contacts -->
        <ul v-else-if="props.blok.layout === 'contacts' && props.blok.contacts" class="flex flex-col gap-7">
          <li v-for="item in props.blok.contacts || []" :key="item._uid" class="flex items-start gap-3">
            <MapSectionContactItem :blok="item" />
          </li>
        </ul>

        <div v-if="props.blok.button?.[0]" class="pt-2 w-full sm:w-auto">
          <Button :blok="props.blok.button[0]" class="w-full sm:w-auto" />
        </div>
      </div>
      <div class="flex-1 border border-stone-900 rounded-xl">
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
import MapSectionContactItem from './MapSectionContactItem.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";

export type MapSectionProps = { blok: MapSectionContent }
const props: MapSectionProps = defineProps({
  blok: { type: Object as PropType<MapSectionContent>, required: true },
})

const sectionClasses: string = `${backgroundColor(
    props.blok.backgroundColor,
)}`
</script>
