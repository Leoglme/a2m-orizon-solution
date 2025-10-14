<template>
  <A2MLink
      :class="props.className"
      :link="link"
      :color="isActiveLink ? (props.blok.activeColor || '#004AAD') : '#1F1F1F'"
      @click="$emit('click')">
    {{ props.blok.label }}
  </A2MLink>
</template>

<script setup lang="ts">
import type { ComputedRef, PropType} from 'vue'
import type { LinkContent } from '~/content'
import type {Router} from "#vue-router";
import { computed } from 'vue'
import A2MLink from "~/components/core/A2MLink.vue";
import {useRouter} from "#imports";

export type LinkProps = {
  blok: LinkContent
  className?: string
}

/* PROPS */
const props: LinkProps = defineProps({
  blok: {
    type: Object as PropType<LinkContent>,
    required: true,
  },
  className: {
    type: String as PropType<string>,
    required: false,
    default: '',
  },
})

/* ROUTE */
const router: Router = useRouter()

/* COMPUTED */
const currentPath: ComputedRef<string> = computed(() => router.currentRoute.value.path)

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

const isActiveLink: ComputedRef<boolean> = computed(() => {
  return currentPath.value === link.value
})

/* METHODS */
function hrefFromStoryLink(slug: string): string {
  // "/pages/mypage" -> "/mypage"
  return '/' + String(slug || '').split('/').slice(1).join('/')
}
</script>
