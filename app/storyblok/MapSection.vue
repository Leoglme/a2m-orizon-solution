<template>
  <section class="min-h-[85vh] flex items-center justify-center w-full" :class="sectionClasses" v-editable="props.blok">
    <div class="w-full px-6 pt-16 pb-24 md:p-10 flex flex-col md:flex-row flex-wrap justify-between max-w-[1500px] gap-16 sm:gap-0">
      <!-- Colonne gauche -->
      <div class="flex-1 md:px-12 lg:px-20 py-4 inline-flex flex-col justify-start
          items-start gap-8 sm:gap-12">
        <h2 ref="titleRef" class="text-2xl sm:text-[44px] font-extrabold tracking-tight">
          {{ props.blok.title || 'Notre secteur d’intervention' }}
        </h2>

        <div ref="contentRef">
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
        </div>

        <div v-if="props.blok.button?.[0]" class="pt-2 w-full sm:w-auto">
          <Button :blok="props.blok.button[0]" class="w-full sm:w-auto" />
        </div>
      </div>
      <div ref="mapRef" class="flex-1 border border-stone-900 rounded-xl">
        <Map v-if="props.blok.map?.[0]" :blok="props.blok.map[0]" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import type {AnimationSettingsContent, MapSectionContent} from '~/content'
import RichTextView from '~/components/RichText.vue'
import Button from './Button.vue'
import Map from './Map.vue'
import MapSectionContactItem from './MapSectionContactItem.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";
import { ref, onMounted } from 'vue'
import {GsapService} from "~/services/gsapService";

export type MapSectionProps = { blok: MapSectionContent }
const props: MapSectionProps = defineProps({
  blok: { type: Object as PropType<MapSectionContent>, required: true },
})

const sectionClasses: string = `${backgroundColor(
    props.blok.backgroundColor,
)}`

/* -------- Refs pour GSAP -------- */
const titleRef: Ref<HTMLElement | null> = ref(null)
const contentRef: Ref<HTMLElement | null> = ref(null)
const mapRef: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  const titleAnimBlk: AnimationSettingsContent | undefined = props.blok.titleAnimation?.[0]

  if (titleRef.value && titleAnimBlk && titleAnimBlk.enabled) {
    GsapService.animate(titleRef.value, titleAnimBlk) // ex: type 'slide-up'
  }

  const contentAnimBlk: AnimationSettingsContent | undefined = props.blok.contentAnimation?.[0]
  if (contentRef.value && contentAnimBlk && contentAnimBlk.enabled) {
    GsapService.animate(contentRef.value, contentAnimBlk) // ex: type 'slide-up'
  }

  const mapAnimBlk: AnimationSettingsContent | undefined = props.blok.mapAnimation?.[0]
  if (mapRef.value && mapAnimBlk && mapAnimBlk.enabled) {
    GsapService.animate(mapRef.value, mapAnimBlk) // ex: type 'slide-up'
  }
})
</script>
