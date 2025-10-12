<template>
  <div class="rounded-xl overflow-hidden">
    <iframe
        :src="embedUrl"
        :height="props.blok.height || 360"
        width="100%"
        style="border:0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        :title="props.blok.title || ariaTitle"
        aria-label="Carte Google Maps"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType, ComputedRef } from 'vue'
import { computed } from 'vue'
import type { MapContent } from '~/content'

export type MapProps = { blok: MapContent }
const props: MapProps = defineProps({
  blok: { type: Object as PropType<MapContent>, required: true },
})

/**
 * Without API key:
 * - Plan (roadmap): https://maps.google.com/maps?q=LAT,LNG&z=ZOOM&output=embed
 * - Satellite: https://maps.google.com/maps?q=LAT,LNG&t=k&z=ZOOM&output=embed
 * (t=k => satellite; sinon roadmap)
 */
const embedUrl: ComputedRef<string> = computed(() => {
  if (props.blok.address?.trim()) {
    const q: string = encodeURIComponent(props.blok.address.trim())
    const z: number = props.blok.zoom ?? 12
    const t: string = props.blok.mapType === 'satellite' ? '&t=k' : ''
    return `https://maps.google.com/maps?q=${q}${t}&z=${z}&output=embed`
  }

  const lat: string = props.blok.latitude?.toString() ?? '0'
  const lng: string = props.blok.longitude?.toString() ?? '0'
  const z: number = props.blok.zoom ?? 12
  const t: string = props.blok.mapType === 'satellite' ? '&t=k' : ''
  return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}${t}&z=${z}&output=embed`
})

const ariaTitle: ComputedRef<string> = computed(() =>
    props.blok.title ||
    props.blok.address
        ? `Carte Google Maps : ${props.blok.address}`
        : `Carte Google Maps centrée sur ${props.blok.latitude}, ${props.blok.longitude}`
)
</script>
