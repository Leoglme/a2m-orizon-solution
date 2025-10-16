<template>
  <nav
      :class="[
      'top-0 right-0 left-0 z-50 flex h-auto sm:h-22 max-w-screen items-center border-b border-stone-900 bg-white',
      props.blok.backdrop ? 'bg-white/75 backdrop-blur-[12px] backdrop-saturate-[1.8]' : '',
      'px-4 sm:px-8 lg:px-20 py-4 sm:py-0 transition-all duration-600 ease-linear',
      props.blok.sticky !== false ? 'fixed' : 'relative'
    ]"
      v-editable="props.blok">
    <div class="mx-auto flex w-full items-center justify-between py-2 sm:py-0">
      <!-- Logo -->
      <ol>
        <li>
          <NuxtLink to="/">
            <A2MLogo :size="30" :large="true" />
          </NuxtLink>
        </li>
      </ol>

      <!-- Desktop -->
      <ol class="hidden items-center justify-center gap-8 text-base font-normal lg:flex">
        <template v-for="(item, idx) in props.blok.items" :key="item._uid || idx">
          <!-- nav_link -->
          <li v-if="item.component === 'link'">
            <BlockLink
                :blok="item"
                className="w-full"
            />
          </li>

          <!-- dropdown -->
          <li v-else-if="item.component === 'dropdown'">
            <BlockDropdwon
                :blok="item"
                className="w-full"
            />
          </li>

          <!-- button -->
          <li v-else-if="item.component === 'button'" class="ml-2">
            <BlockButton :blok="item" />
          </li>
        </template>
      </ol>

      <!-- Mobile trigger -->
      <button
          class="lg:hidden cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in-out"
          aria-label="Ouvrir le menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <HamburgerIcon />
      </button>
    </div>
  </nav>

  <!-- Mobile menu -->
  <teleport to="body">
    <transition name="fade">
      <div
          v-show="mobileMenuOpen"
          class="fixed top-0 right-0 bottom-0 left-0 z-[9998] bg-[rgba(0,0,0,.8)] lg:hidden"
          @click.self="mobileMenuOpen = false"
      >
        <transition name="slide-up-down">
          <div v-if="mobileMenuOpen" class="absolute right-0 bottom-0 left-0 z-[9999] m-auto h-[calc(100dvh-79px)]">
            <section class="relative h-full w-full overflow-auto bg-white outline-none" @click.stop>
              <div class="flex flex-col gap-8 p-8">
                <template v-for="(item, idx) in props.blok.items" :key="item._uid || 'm-'+idx">
                  <!-- Link -->
                  <BlockLink
                      v-if="item.component === 'link'"
                      :blok="item"
                      className="w-full"
                      @click="mobileMenuOpen = false"
                  />

                  <!-- Dropdown -->
                  <BlockDropdwon
                      v-else-if="item.component === 'dropdown'"
                      :blok="item"
                      className="w-full"
                  />

                  <!-- Button -->
                  <BlockButton
                      v-else-if="item.component === 'button'"
                      :blok="item"
                      class="w-full"
                      @click="mobileMenuOpen = false"
                  />
                </template>
              </div>
            </section>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { NavbarContent } from '~/content'
import type { Ref } from 'vue'
import { ref } from 'vue'
import NuxtLink from '#app/components/nuxt-link'

import A2MLogo from '~/components/branding/A2MLogo.vue'
import HamburgerIcon from '~/components/icons/HamburgerIcon.vue'
import BlockButton from '~/storyblok/Button.vue'
import BlockLink from '~/storyblok/Link.vue'
import BlockDropdwon from '~/storyblok/Dropdown.vue'


export type NavbarProps = {
  blok: NavbarContent
}

const props: NavbarProps = defineProps({
  blok: {
    type: Object as PropType<NavbarContent>,
    required: true
  },
})

/* REFS */
const mobileMenuOpen: Ref<boolean> = ref(false)
</script>

<style scoped>
/* Fade backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Slide-up-down menu */
.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-down-enter-from,
.slide-up-down-leave-to {
  transform: translateY(100%);
}
.slide-up-down-enter-to,
.slide-up-down-leave-from {
  transform: translateY(0%);
}
</style>
