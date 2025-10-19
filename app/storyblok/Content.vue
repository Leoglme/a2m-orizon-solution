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

  <slot v-if="props.blok.component === 'faq'">
    <Faq :blok="props.blok" />
  </slot>

  <slot v-if="props.blok.component === 'map_section'">
    <MapSection :blok="props.blok" />
  </slot>
  <slot v-if="props.blok.component === 'map'">
    <Map :blok="props.blok" />
  </slot>
  <slot v-if="props.blok.component === 'contact_section'">
    <ContactSection :blok="props.blok" />
  </slot>
  <slot v-if="props.blok.component === 'navbar'">
    <Navbar :blok="props.blok" />
  </slot>
  <slot v-if="props.blok.component === 'link'">
    <Link :blok="props.blok" />
  </slot>
  <slot v-if="props.blok.component === 'dropdown'">
    <Dropdown :blok="props.blok" />
  </slot>
  <slot v-if="props.blok.component === 'footer'">
    <Footer :blok="props.blok" />
  </slot>
  <slot v-if="props.blok.component === 'email_contact_template'">
    <EmailContactPreview
        :blok="props.blok"
        :vars="{
          name: 'John Doe',
          email: 'john@a2m-orizon-solutionsocial.fr',
          subject: 'Demande de devis',
          message: 'Bonjour, je souhaite obtenir un devis pour vos services.'
        }"
    />
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
import Faq from './Faq.vue'
import MapSection from './MapSection.vue'
import Map from './Map.vue'
import ContactSection from './ContactSection.vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import Link from './Link.vue'
import Dropdown from './Dropdown.vue'
import EmailContactPreview from './EmailContactPreview.vue'

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
