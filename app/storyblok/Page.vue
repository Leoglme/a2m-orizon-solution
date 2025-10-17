<template>
  <div
      class="flex flex-col items-stretch pt-[76px] sm:pt-20"
      v-editable="props.blok"
  >
    <slot
      v-for="content in props.blok.body">
    <Content :blok="content" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import Content from '~/storyblok/Content.vue'
import type { PageContent } from '~/content'

export type PageProps = {
  blok: PageContent
}

const props: PageProps = defineProps({
  blok: {
    type: Object as PropType<PageContent>,
    required: true,
  },
})
</script>
