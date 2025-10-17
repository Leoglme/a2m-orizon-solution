<template>
  <section
      class="min-h-screen flex items-center justify-center w-full px-4 pb-10 sm:px-8 sm:py-16 md:px-20 md:py-24 "
      :class="sectionClasses"
      v-editable="props.blok">
    <div class="w-full max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
      <div class="flex flex-col items-start gap-2">
        <div class="flex items-center justify-center w-full gap-3 sm:gap-8">
          <svg
              width="50"
              height="50"
              viewBox="0 0 51 50"
              fill="none"
              class="w-7 h-7 sm:w-12.5 sm:h-12.5"
           >
            <path
                d="M20.9102 0.107422C17.4141 0.283203 12.4727 0.78125 10.8418 1.12305C8.69336 1.58203 6.73047 2.66602 4.93359 4.41406C3.38086 5.91797 2.35547 7.5 1.80859 9.22852C1.10547 11.4551 0.5 16.8262 0.5 20.9473C0.5 24.9316 1.0957 30.3613 1.7793 32.5781C2.26758 34.1602 3.23438 35.7227 4.61133 37.1582C6.42773 39.0332 8.60547 40.3027 10.832 40.7715C11.6523 40.9375 14.2109 41.2598 16.3691 41.4551C17.2773 41.543 18.0293 41.6211 18.0391 41.6309C18.752 42.7539 21.291 46.4551 22.0137 47.4316C23.5371 49.4727 24.2012 49.9512 25.5 49.9512C26.3594 49.9512 26.9062 49.7363 27.5605 49.1602C28.1172 48.6523 29.6699 46.5527 31.4863 43.8379L32.9707 41.6211L33.5566 41.5625C33.8789 41.5332 34.8457 41.4355 35.7051 41.3477C37.9219 41.1328 39.9043 40.8496 40.793 40.6152C41.8281 40.3516 43.5176 39.5215 44.5723 38.7695C45.5879 38.0371 47.1504 36.4453 47.7852 35.498C48.3809 34.5996 48.9668 33.4082 49.2207 32.5781C49.9043 30.3613 50.5 24.9316 50.5 20.9473C50.5 16.9336 49.9043 11.5332 49.2207 9.32617C48.6934 7.60742 47.5996 5.9082 46.0664 4.41406C44.6406 3.02734 43.0293 2.01172 41.418 1.46484C38.4004 0.449219 27.9609 -0.244141 20.9102 0.107422ZM29.6113 3.80859C34.8555 4.07227 38.9961 4.55078 40.3828 5.04883C42.834 5.9375 45.1582 8.36914 45.7539 10.6934C46.6816 14.3164 47.0332 21.1621 46.5449 26.0742C46.3789 27.7148 45.9883 30.2637 45.7539 31.1914C45.2461 33.1738 43.4004 35.3418 41.3203 36.416C39.8945 37.1484 38.8789 37.3438 34.0645 37.793C30.9199 38.0859 30.8125 38.1543 28.7812 41.2109C27.1406 43.6914 25.627 45.8008 25.5 45.8008C25.373 45.8008 23.8594 43.6914 22.2188 41.2109C20.1094 38.0371 20.168 38.0762 16.0273 37.6953C13.9473 37.5098 11.9062 37.2168 11.1641 37.0117C8.47852 36.2598 5.90039 33.7305 5.24609 31.2012C4.66016 28.8867 4.21094 24.4727 4.21094 20.8984C4.21094 17.4316 4.66016 12.9883 5.24609 10.6934C5.8418 8.37891 8.17578 5.92773 10.6172 5.04883C13.1465 4.14062 23.1855 3.48633 29.6113 3.80859Z"
                fill="#EC9E0A"/>
            <path
                d="M24.8457 8.50593C23.791 8.64265 23.0391 8.86726 22.0137 9.37507C20.2657 10.2344 18.7227 11.9532 17.9121 13.9356C17.4336 15.1075 17.3653 15.9376 17.7168 16.5235C18.2246 17.4024 19.3477 17.6856 20.2364 17.168C20.7149 16.8848 20.92 16.5528 21.3106 15.4493C21.6133 14.5899 22.3653 13.5548 23.0782 13.0372C24.0938 12.2852 25.5196 11.9923 27.1016 12.1973C28.625 12.4024 29.543 12.8907 30.1582 13.8087C31.4766 15.752 30.4024 17.8028 27.1993 19.4727C25.92 20.1368 24.9434 21.1427 24.3282 22.4122C23.752 23.5938 23.6055 24.2677 23.6055 25.6934C23.5957 26.8653 23.6055 26.9337 23.8692 27.3243C24.6309 28.4766 26.4473 28.3692 27.0528 27.129C27.209 26.7969 27.2578 26.5137 27.2578 25.918C27.2578 24.9903 27.4336 24.3262 27.8536 23.7012C28.1563 23.2423 28.293 23.1348 29.8262 22.2364C32.1895 20.8399 33.7129 19.0333 34.25 16.9923C34.4649 16.1719 34.4649 14.795 34.2403 13.9649C33.8692 12.5294 32.9317 11.045 31.8672 10.2052C30.1192 8.8282 27.4043 8.1739 24.8457 8.50593Z"
                fill="#EC9E0A"/>
            <path
                d="M23.791 31.2988C23.3125 31.4648 22.9121 31.9043 22.7754 32.3926C22.6387 32.8809 22.6387 35.0977 22.7754 35.5957C22.9121 36.0938 23.4102 36.5723 23.9277 36.7188C24.1523 36.7773 24.8652 36.8262 25.5 36.8262C26.1348 36.8262 26.8477 36.7773 27.0723 36.7188C27.5898 36.5723 28.0879 36.0938 28.2246 35.5957C28.3613 35.0879 28.3613 32.8809 28.2246 32.373C28.0879 31.8848 27.5996 31.3965 27.1113 31.2598C26.5449 31.1035 24.2695 31.1328 23.791 31.2988Z"
                fill="#EC9E0A"/>
          </svg>
          <h1 class="text-2xl sm:text-5xl font-extrabold tracking-tight mb-1">
            {{ props.blok.title }}
          </h1>
        </div>

        <slot v-if="props.blok.description">
          <RichTextView :doc="props.blok.description" :blok="props.blok"/>
        </slot>
      </div>

      <div class="flex flex-col divide-y divide-stone-200 rounded-xl overflow-hidden bg-white">
        <slot v-for="item in props.blok.items" :key="item._uid">
          <FaqItem
              :blok="item"
              :is-open="isOpen(item._uid)"
              @toggle="onToggle(item._uid)"
          />
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {PropType, Ref} from 'vue'
import {ref} from 'vue'
import type {FaqContent} from '~/content'
import RichTextView from '~/components/RichText.vue'
import FaqItem from './FaqItem.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";

export type FaqProps = {
  blok: FaqContent
}
const props: FaqProps = defineProps({
  blok: {type: Object as PropType<FaqContent>, required: true},
})

/** Opening management: only one open by default */
const openUid: Ref<string | null> = ref(
    props.blok.items.find(i => i.defaultOpen)?._uid ?? null
)
const allowMultiple = props.blok.allowMultipleOpen === true
const openedSet: Ref<Set<string>> = ref(new Set(
    props.blok.items.filter(i => i.defaultOpen).map(i => i._uid)
))

const isOpen = (uid: string): boolean => {
  return allowMultiple ? openedSet.value.has(uid) : openUid.value === uid
}

const onToggle = (uid: string) => {
  if (allowMultiple) {
    if (openedSet.value.has(uid)) openedSet.value.delete(uid)
    else openedSet.value.add(uid)
  } else {
    openUid.value = openUid.value === uid ? null : uid
  }
}

const sectionClasses = `${backgroundColor(
    props.blok.backgroundColor,
)}`
</script>
