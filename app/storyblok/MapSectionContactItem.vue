<template>
  <div>
    <A2MLink
        v-if="isLink"
        :link="link"
        color="#1F1F1F">
      <div
          class="flex flex-wrap w-full items-center justify-baseline gap-3"
      >
        <ContactIcon
            :iconType="props.blok.icon"
        />
        <span class="text-base font-normal">
          {{ blok.text }}
        </span>
      </div>
    </A2MLink>
    <div
        v-else
        class="flex flex-wrap w-full items-center justify-baseline gap-3"
    >
      <ContactIcon
          :iconType="props.blok.icon"
      />
      <span class="text-base font-normal">
          {{ blok.text }}
        </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropType, ComputedRef} from 'vue'
import type {ContactItemContent} from '~/content'
import {computed} from 'vue'
import ContactIcon from '~/components/icons/ContactIcon.vue'
import A2MLink from "~/components/core/A2MLink.vue";

export type MapSectionContactItemProps = {
  blok: ContactItemContent
}

const props: MapSectionContactItemProps = defineProps({
  blok: {
    type: Object as PropType<ContactItemContent>,
    required: true,
  },
})

/* COMPUTED */
const isLink: ComputedRef<boolean> = computed(() => {
  return !!props.blok.link
})

const link: ComputedRef<string> = computed(() => {
  if (!props.blok || !props.blok.link) return '#'
  switch (props.blok.link.linktype) {
    case 'story':
      return hrefFromStoryLink(props.blok.link.cached_url || '')
    case 'email':
      return `mailto:${props.blok.link.email || ''}`
    case 'asset':
    case 'url':
    default:
      return props.blok.link.cached_url || '#'
  }
})

/* METHODS */
function hrefFromStoryLink(slug: string): string {
  // "/pages/mypage" -> "/mypage"
  return '/' + String(slug || '').split('/').slice(1).join('/')
}
</script>
