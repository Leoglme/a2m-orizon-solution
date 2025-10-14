<template>
  <div
      :class="`self-stretch px-4 sm:px-10 pt-10 pb-6 bg-stone-900 flex flex-col lg:flex-row justify-center lg:justify-between items-center overflow-hidden lg:px-20 md:pt-20 md:pb-10 gap-24 ${props.className}`">
    <div class="self-stretch flex flex-col justify-center items-center gap-8 md:gap-12">
      <div
          class="self-stretch flex flex-col justify-start items-center gap-2.5 md:flex-row md:items-center">
        <div
            class="w-full flex justify-start items-center gap-1 flex-wrap content-center md:w-[577px]">
          <div
              v-if="props.blok.title"
              class="flex-1 text-white text-2xl sm:text-3xl font-extrabold leading-9 md:text-5xl md:leading-[62px]">
            {{ props.blok.title }}
          </div>
        </div>
      </div>
      <div
          class="self-stretch flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
        <div
            class="w-full flex flex-col justify-start items-start gap-6 md:w-[453.38px] md:gap-10">
          <RichTextView
              v-if="props.blok.description"
              class="self-stretch text-white text-sm font-normal leading-relaxed sm:text-base"
              :doc="props.blok.description"
              :blok="props.blok"
          />

          <div class="flex items-center gap-7">
            <NuxtLink
                v-if="props.blok.linkedInUrl"
                class="text-white hover:text-white/70"
                external target="_blank" rel="noopener"
                :to="props.blok.linkedInUrl">
              <LinkedInIcon/>
            </NuxtLink>

            <NuxtLink
                v-if="props.blok.phoneNumber"
                class="text-white hover:text-white/70"
                external target="_blank" rel="noopener"
                :to="`tel:${props.blok.phoneNumber}`">
              <PhoneIcon/>
            </NuxtLink>

            <NuxtLink
                v-if="props.blok.email"
                class="text-white hover:text-white/70"
                external target="_blank" rel="noopener"
                :to="`mailto:${props.blok.email}`">
              <MailIcon/>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div
        class="flex flex-col gap-12 w-full md:flex-row md:justify-end md:items-start lg:gap-24 self-stretch">
      <slot
          v-for="menu in props.blok.menus"
      >
        <div
            v-if="menu"
            class="inline-flex flex-col justify-start items-start gap-2 md:gap-3.5 w-auto sm:w-full lg:w-auto lg:min-w-[250px]">
          <div
              class="text-white text-lg font-semibold leading-6 md:text-xl md:leading-7">
            {{ menu.title }}
          </div>
          <slot
              v-for="item in menu.items">
            <A2MLink
                v-if="resolveTo(item) !== '#'"
                class="text-base font-medium leading-snug"
                :link="resolveTo(item)"
                :color="isActiveLink(resolveTo(item)) ? '#FFFFFF' : 'rgb(255, 255, 255, 0.7)'">
              {{ item.label }}
            </A2MLink>

            <span
                v-else
                class="text-base font-medium leading-snug text-white/70">
              {{ item.label }}
            </span>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType, ComputedRef } from 'vue'
import type {Router} from "#vue-router";
import type { FooterContent, FooterMenuItemContent } from "~/content";
import LinkedInIcon from '~/components/icons/LinkedInIcon.vue'
import PhoneIcon from '~/components/icons/PhoneIcon.vue'
import MailIcon from '~/components/icons/MailIcon.vue'
import NuxtLink from '#app/components/nuxt-link'
import A2MLink from "~/components/core/A2MLink.vue";
import {useRouter} from "#imports";
import RichTextView from "~/components/RichText.vue";


/* TYPES */
export type FooterProps = {
  blok: FooterContent
  className?: string
}


/* PROPS */
const props: FooterProps = defineProps({
  blok: {
    type: Object as PropType<FooterContent>,
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


/* METHODS */
const hrefFromStoryLink = (slug: string): string => {
  // "/pages/mypage" -> "/mypage"
  return '/' + String(slug || '').split('/').slice(1).join('/')
}

const resolveTo = (linkContent: FooterMenuItemContent): string => {
  if(!linkContent.link) return '#'

  switch (linkContent.link.linktype) {
    case 'story':
      if(linkContent.link.cached_url === '') return '#'
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
</script>
