<template>
  <div
      class="self-stretch flex justify-center bg-white px-5 pt-24 pb-24 sm:px-8 sm:py-16 md:px-20 md:py-24"
      v-editable="props.blok">
    <div
        class="flex-1 flex flex-col justify-start items-center gap-16 sm:gap-14 max-w-7xl">
      <div class="self-stretch flex flex-col justify-start items-center gap-2">
        <RichTextView :doc="props.blok.description" :blok="props.blok" />
      </div>
      <div class="self-stretch flex flex-col items-stretch gap-4 md:gap-5">


        <div
            class="overflow-x-auto max-w-[92vw] sm:max-w-none self-stretch p-1 bg-white rounded-lg outline-1 outline-offset-[-1px] outline-stone-900 inline-flex justify-start items-center gap-2">
          <slot
              v-for="tab in props.blok.tabs">
            <button
                @click="async (_event) => (currentTabUid = tab._uid)"
                :class="`flex-1 py-2 text-sm sm:py-3 sm:text-base md:py-4 min-w-28 ${
                currentTabUid === tab._uid
                  ? 'bg-primary text-white'
                  : 'bg-transparent text-stone-800 cursor-pointer hover:bg-stone-100'
              } rounded-lg flex justify-center items-center gap-0.5`"
                v-editable="tab">
              <div class="justify-center font-bold leading-snug">
                {{ tab.title }}
              </div>
            </button>
          </slot>
        </div>
        <slot
            v-for="content in currentTab?.content">
          <div
              class="rounded-xl md:rounded-3xl overflow-hidden flex-col items-stretch gap-2">
            <Content :blok="content" />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref, PropType, ComputedRef } from 'vue'
import type { TabsContent, TabContent } from '~/content'
import { ref, computed } from 'vue'
import Content from './Content.vue'
import RichTextView from '~/components/RichText.vue'

export type TabsProps = {
  blok: TabsContent
}

const props: TabsProps = defineProps({
  blok: {
    type: Object as PropType<TabsContent>,
    required: true,
  },
})
const currentTabUid: Ref<string | undefined, string | undefined> = ref(props.blok.tabs[0]?._uid)
const currentTab: ComputedRef<TabContent | undefined> = computed(() => {
  return props.blok.tabs.find((tab: TabContent) => tab._uid === currentTabUid.value)
})
</script>
