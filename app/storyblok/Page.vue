<template>
  <div
      class="flex flex-col items-stretch"
      v-editable="props.blok"
  >
    <AppBar />
    <slot
      v-for="content in props.blok.body">
    <Content :blok="content" />
    </slot>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import AppBar from '~/components/AppBar.vue'
import Footer from '~/components/Footer.vue'
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
