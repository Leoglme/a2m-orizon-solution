<template>
  <div
      :class="`self-stretch px-4 pt-10 pb-6 bg-stone-900 flex flex-col justify-center items-center gap-8 overflow-hidden sm:px-10 md:px-20 md:pt-20 md:pb-10 md:gap-12 ${props.className}`">
    <div
        class="self-stretch flex flex-col justify-start items-center gap-2.5 md:flex-row md:items-center">
      <div
          class="w-full flex justify-start items-center gap-1 flex-wrap content-center md:w-[577px]">
        <div
            class="flex-1 text-white text-2xl font-extrabold leading-9 md:text-5xl md:leading-[62px]">
          Let’s make something cool together
        </div>
      </div>
    </div>
    <div
        class="self-stretch flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
      <div
          class="w-full flex flex-col justify-start items-start gap-6 md:w-[453.38px] md:gap-10">
        <div
            class="self-stretch text-white text-sm font-normal leading-relaxed md:text-base">
          80,000 + developers & marketers use Storyblok&apos;s CMS to deliver
          powerful content experiences on any frontend: Websites, eCommerce,
          mobile apps, AR/VR or voice content.
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink
              class="text-white"
              to="https://www.linkedin.com/">
            <LinkedInIcon />
          </NuxtLink>
        </div>
      </div>
      <div
          class="flex flex-col gap-8 w-full md:flex-row md:justify-start md:items-start md:gap-28 md:w-auto">
        <slot
            v-for="menu in footerMenu"
            :key="menu.id">
          <div
              class="inline-flex flex-col justify-start items-start gap-2 md:gap-3.5">
            <div
                class="text-white text-lg font-semibold leading-6 md:text-xl md:leading-7">
              {{ menu.title }}
            </div>
            <slot
                v-for="item in menu.items"
                :key="item.href">
              <NuxtLink
                  :class="`text-base font-medium leading-snug ${
                  path === item.href ? 'text-green-300' : 'text-white/70'}`"
                  :to="item.href">
                {{ item.label }}
              </NuxtLink>
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref, PropType } from 'vue'
import LinkedInIcon from '~/components/icons/LinkedInIcon.vue'
import NuxtLink from '#app/components/nuxt-link'

type FooterMenuItem = {
  label: string
  href: string
}

type FooterMenu = {
  id: number
  title: string
  items: FooterMenuItem[]
}

const footerMenu: FooterMenu[] = [
  {
    id: 0,
    title: 'Learn more',
    items: [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'Services',
        href: '/services',
      },
      {
        label: 'About',
        href: '/about',
      },
      {
        label: 'Blog',
        href: '/blog',
      },
      {
        label: 'Get in touch',
        href: '/get-in-touch',
      },
    ],
  },
  {
    id: 1,
    title: 'Service',
    items: [
      {
        label: 'Brand',
        href: '/brand',
      },
      {
        label: 'Strategy',
        href: '/strategy',
      },
      {
        label: 'Website',
        href: '/website',
      },
      {
        label: 'Marketing',
        href: '/marketing',
      },
      {
        label: 'Design',
        href: '/design',
      },
    ],
  },
  {
    id: 2,
    title: 'Resources',
    items: [
      {
        label: 'Enterprise',
        href: '/enterprise',
      },
      {
        label: 'Case Studies',
        href: '/case-studies',
      },
      {
        label: 'Legal',
        href: '/legal',
      },
    ],
  },
]

export type FooterViewProps = {
  className?: string
}

const props: FooterViewProps = defineProps({
  className: {
    type: String as PropType<string>,
    required: false,
    default: '',
  },
})
const path: Ref<string | undefined> = ref(undefined)

onMounted(() => {
  path.value = window.location.pathname
})
</script>
