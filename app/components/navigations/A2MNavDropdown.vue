<template>
  <div ref="root" class="relative inline-block text-left">
    <!-- Bouton -->
    <button
        type="button"
        class="inline-flex items-center gap-1 font-semibold text-base hover:opacity-90 cursor-pointer decoration-2 underline-offset-4 hover:underline"
        :class="hasActiveItem ? 'text-primary' : 'text-stone-900'"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-controls="menuId"
        @click="toggle"
        @keydown.enter.prevent="toggle"
        @keydown.space.prevent="toggle"
        @keydown.escape="close"
    >
      <span>{{ label }}</span>
      <!-- chevron -->
      <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-transform"
          :class="open ? 'rotate-180' : 'rotate-0'"
      >
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <!-- Menu -->
    <transition name="fade">
      <div
          v-if="open"
          :id="menuId"
          role="menu"
          class="md:absolute left-0 mt-2 min-w-[220px] origin-top-left rounded-md md:border border-stone-200 bg-white p-1 md:shadow-md focus:outline-none"
          @keydown.escape="close"
      >
        <ul class="flex flex-col">
          <li v-for="item in items" :key="item.text" role="none">
            <A2MLink
                :link="item.to"
                :color="item.color ? item.color : currentRoute === item.to ? '#004AAD' : '#1F1F1F'"
                class="block rounded-md px-3 py-2 text-sm no-underline hover:bg-neutral-100 w-full"
                role="menuitem"
                @click="close"
            >
              {{ item.text }}
            </A2MLink>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { Router } from '#vue-router'
import type {Ref, ComputedRef} from 'vue'
import {ref, onMounted, onBeforeUnmount, computed} from 'vue'
import A2MLink from '~/components/core/A2MLink.vue'

/* TYPES */
export type NavItem = {
  text: string
  to: string
  color?: string
}


/* PROPS */
const props = defineProps<{
  label: string
  items: NavItem[]
  id?: string
}>()

/* ROUTE */
const router: Router = useRouter()

/* REFS */
const open: Ref<boolean> = ref(false)
const root: Ref<HTMLElement | null> = ref(null)
const currentRoute: Ref<string> = ref(router.currentRoute.value.path)

/* COMPUTED */
const menuId: ComputedRef<string> = computed(() => props.id || `nav-dd-${props.label.toLowerCase().replace(/\s+/g, '-')}`)
const hasActiveItem: ComputedRef<boolean> = computed(() => {
  return props.items.some(item => item.to === currentRoute.value)
})

/* METHODS */
function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (!root.value) return
  if (!root.value.contains(e.target as Node)) close()
}

/* LIFECYCLE */
onMounted(() => document.addEventListener('mousedown', onDocClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocClick))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .12s ease, transform .12s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
