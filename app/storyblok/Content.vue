<template>
  <slot v-if="props.blok.component === 'page'">
    <Page :blok="props.blok"></Page>
  </slot>

  <slot v-if="props.blok.component === 'cards'">
    <Cards :blok="props.blok"></Cards>
  </slot>

  <slot v-if="props.blok.component === 'card'">
    <Card :blok="props.blok"></Card>
  </slot>

  <slot v-if="props.blok.component === 'hero'">
    <Hero :blok="props.blok"></Hero>
  </slot>

  <slot v-if="props.blok.component === 'tabs'">
    <Tabs :blok="props.blok"></Tabs>
  </slot>

  <slot v-if="props.blok.component === 'button'">
    <Button :blok="props.blok"></Button>
  </slot>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type {
  Content,
} from '~/content'
import Page from './Page.vue'
import Cards from './Cards.vue'
import Hero from './Hero.vue'
import Tabs from './Tabs.vue'
import Card from './Card.vue'
import Button from './Button.vue'

export type ContentProps = {
  blok: Content
}

const props: ContentProps = defineProps({
  blok: {
    type: Object as PropType<Content>,
    required: true,
  },
})
</script>
