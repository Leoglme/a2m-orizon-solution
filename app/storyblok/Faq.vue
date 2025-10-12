<template>
  <section
      :class="sectionClasses"
      v-editable="props.blok">
    <div class="w-full max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
      <div class="flex flex-col items-start gap-2">
        <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {{ props.blok.title }}
        </h2>

        <slot v-if="props.blok.description">
          <RichTextView :doc="props.blok.description" :blok="props.blok" />
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
import type { PropType, Ref } from 'vue'
import { ref } from 'vue'
import type { FaqContent } from '~/content'
import RichTextView from '~/components/RichText.vue'
import FaqItem from './FaqItem.vue'

export type FaqProps = {
  blok: FaqContent
}
const props: FaqProps = defineProps({
  blok: { type: Object as PropType<FaqContent>, required: true },
})

/** Opening management: only one open by default */
const openUid: Ref<string | null> = ref(
    props.blok.items.find(i => i.defaultOpen)?. _uid ?? null
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

const sectionClasses = `w-full px-4 py-10 sm:px-8 sm:py-16 md:px-20 md:py-24 ${
    props.blok.backgroundColor === 'white'
        ? 'bg-white'
        : props.blok.backgroundColor === 'grey'
            ? 'bg-neutral-100'
            : props.blok.backgroundColor === 'beige'
                ? 'bg-amber-50'
                : 'bg-white'
}`
</script>
