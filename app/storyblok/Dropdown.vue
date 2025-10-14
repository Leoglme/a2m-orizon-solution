<template>
  <A2MNavDropdown
      :id="props.blok._uid"
      :label="props.blok.label"
      :items="items"
  />
</template>

<script setup lang="ts">
import type { ComputedRef, PropType} from 'vue'
import type { DropdownContent, LinkContent } from '~/content'
import type {Router} from "#vue-router";
import type { NavItem } from "~/components/navigations/A2MNavDropdown.vue";
import { computed } from 'vue'
import {useRouter} from "#imports";
import A2MNavDropdown from "~/components/navigations/A2MNavDropdown.vue";

export type DropdownProps = {
  blok: DropdownContent
  className?: string
}

/* PROPS */
const props: DropdownProps = defineProps({
  blok: {
    type: Object as PropType<DropdownContent>,
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

const items: ComputedRef<NavItem[]> = computed(() => {
  return (props.blok.items || []).map(item => ({
    text: item.label,
    to: resolveTo(item),
    color: isActiveLink(resolveTo(item)) ? (item.activeColor || '#004AAD') : '#1F1F1F',
  }))
})

/* METHODS */
const resolveTo = (linkContent: LinkContent): string => {
  switch (linkContent.link.linktype) {
    case 'story':
      return hrefFromStoryLink(linkContent.link.cached_url || '')
    case 'email':
      return `mailto:${linkContent.link.email || ''}`
    case 'asset':
    case 'url':
    default:
      return linkContent.link.cached_url || '#'
  }
}

const isActiveLink = (to: string): boolean => {
  return currentPath.value === to
}

const hrefFromStoryLink = (slug: string): string => {
  // "/pages/mypage" -> "/mypage"
  return '/' + String(slug || '').split('/').slice(1).join('/')
}
</script>
