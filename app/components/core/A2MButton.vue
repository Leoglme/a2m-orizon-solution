<template>
  <component
      class="a2m-button"
      :is="componentType"
      :to="isLink ? props.to : undefined"
      :href="isExternalLink || isLink ? props.to : undefined"
      :disabled="props.disabled"
      :class="computedClass"
      :style="{
      '--background-color': backgroundColor,
      '--background-hover-color': backgroundHoverColorComputed,
    }"
      :target="isExternalLink ? '_blank' : undefined"
      @click="onClick"
  >
    <span class="flex items-center justify-center">
      <slot />
      <DoubleChevronsDownIcon
        v-if="isAnchorLink"
        className="animate-bounce-pulse ml-2"
      />
    </span>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import { defineProps } from '@vue/runtime-core'
import { ColorUtils } from '~/core/utils/ColorUtils'
import DoubleChevronsDownIcon from "~/components/icons/DoubleChevronsDownIcon.vue";

const A2MButtonSizes: string[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

/**
 * Type definitions for the A2M button component size
 * @type {A2MButtonSize}
 */
export type A2MButtonSize = (typeof A2MButtonSizes)[number]

/**
 * Type definitions for the A2M button component props
 * @type {A2MButtonProps}
 * @property {string | null} to - The route to navigate to
 * @property {string} backgroundColor - The button background color
 * @property {string} backgroundHoverColor - The button background hover color
 * @property {boolean} disabled - Whether the button is disabled
 * @property {A2MButtonSize} size - The button size
 */
export type A2MButtonProps = {
  to?: string | null
  backgroundColor: string
  backgroundHoverColor: string
  disabled: boolean
  size: A2MButtonSize
}

const props: A2MButtonProps = defineProps({
  to: {
    type: String,
    default: null,
  },
  backgroundColor: {
    type: String,
    default: '#004AAD',
  },
  backgroundHoverColor: {
    type: String,
    default: '#045DC3',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<A2MButtonSize>,
    default: 'md',
  },
})


const isAnchorLink: ComputedRef<boolean> = computed(() => {
  if (!props.to) return false
  return props.to.startsWith('#') && props.to.length > 1
})

const backgroundHoverColorComputed: ComputedRef<string> = computed(() => {
  if (props.backgroundColor === '#004AAD') {
    return props.backgroundHoverColor
  }

  return ColorUtils.hslToHex(ColorUtils.adjustLightness(ColorUtils.hexToHSL(props.backgroundColor), 6))
})


const buttonSizes: Record<A2MButtonSize, string> = {
  xs: 'px-6 py-1 text-xs',
  sm: 'px-10 py-3 text-sm',
  md: 'px-20 py-3.5 text-sm',
  lg: 'px-24 py-4 text-sm',
  xl: 'px-28 py-5 text-lg',
  '2xl': 'px-32 py-6 text-lg',
}


const computedClass: ComputedRef<string> = computed(
    () => `
  self-center rounded-lg inline-flex flex-col items-center gap-2.5 overflow-hidden text-center justify-center text-white font-semibold leading-tight bg-primary hover:bg-primary-light
  focus:outline-none focus:shadow-outline transition duration-150 ease-in-out select-none
  ${props.disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
  ${buttonSizes[props.size]}
`,
)

const isExternalLink: ComputedRef<boolean> = computed(() => {
  if (!props.to) return false
  return /^(https?|tel|mailto):\/\/|^\/\//.test(props.to.trim())
})

const isLink: ComputedRef<boolean> = computed(() => {
  if (!props.to) return false
  if (isAnchorLink.value) return false
  return !isExternalLink.value
})

const componentType: ComputedRef<string> = computed(() => {
  if (isAnchorLink.value) return 'a'
  if (isExternalLink.value) return 'a'
  if (isLink.value) return 'RouterLink'
  return 'button'
})

/**
 * Function to scroll to the target section.
 * @returns {void}
 */
const scrollToTargetSection: (ctaTarget: string) => void = (ctaTarget: string): void => {
  const targetSection: HTMLElement | null = document.querySelector(ctaTarget)
  console.log({
    ctaTarget,
    targetSection
  })
  if (targetSection) {
    const offset: number = 85
    const top: number = targetSection.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  } else {
    console.warn(`Target section ${ctaTarget} not found.`)
  }
}

const onClick = () => {
  if (isAnchorLink.value && props.to) {
    scrollToTargetSection(props.to)
  }
}
</script>

<style>
.button-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

:root {
  --background-color: #004AAD;
  --background-hover-color: #045DC3;
}

.a2m-button,
.a2m-button:active,
.a2m-button:hover:active {
  background-color: var(--background-color);
}

.a2m-button:hover {
  background-color: var(--background-hover-color);
}

.a2m-button:disabled,
.a2m-button:disabled:hover,
.a2m-button:disabled:active {
  background-color: var(--background-color);
}
</style>
