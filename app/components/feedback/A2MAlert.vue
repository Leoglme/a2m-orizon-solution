<template>
  <div v-if="props.message" :class="alertClasses" role="alert" class="flex items-center rounded-lg border p-4">
    <A2MAlertIcon
      :variant="props.variant"
    />

    <span class="flex-1">{{ props.message }}</span>

    <button
        v-if="props.dismissible"
        @click="hideAlert"
        class="ml-2 text-current hover:opacity-80"
        aria-label="Fermer l'alerte"
    >
      <XIcon className="-mb-1" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import type { PropType, ComputedRef } from 'vue'
import A2MAlertIcon from "~/components/feedback/A2MAlertIcon.vue";
import XIcon from "~/components/icons/XIcon.vue";

/**
 * Type definitions for the A2MAlert component variants
 * @description This type is used to restrict the variant prop to the defined variants.
 */
export type A2MAlertVariant = 'error' | 'success' | 'warning' | 'info'

/**
 * Type definitions for the A2MAlert component props
 */
export type A2MAlertProps = {
  message: string
  dismissible?: boolean
  variant?: A2MAlertVariant
}

/**
 * Type definitions for the A2MAlert component props
 * @type {A2MAlertProps}
 * @property {string} message - The message to display in the alert
 * @property {boolean} dismissible - Whether the alert can be dismissed
 * @property {string} variant - The variant of the alert
 */
const props: A2MAlertProps = defineProps({
  message: {
    type: String,
    required: true,
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<A2MAlertVariant>,
    default: 'info',
  },
})

/*EMIT*/
const emit: (event: 'hide') => void = defineEmits<{
  (event: 'hide'): void
}>()

/* COMPUTED */
const alertClasses: ComputedRef<string> = computed(() => {
  switch (props.variant) {
    case 'error':
      return 'bg-red-100 border-red-400 text-red-700'
    case 'success':
      return 'bg-green-100 border-green-400 text-green-700'
    case 'warning':
      return 'bg-yellow-100 border-yellow-400 text-yellow-700'
    case 'info':
      return 'bg-blue-100 border-blue-400 text-blue-700'
    default:
      return 'bg-gray-100 border-gray-400 text-gray-700'
  }
})

/* METHODS */
/**
 * Method to hide the alert
 * @returns {void} This function does not return a value.
 */
const hideAlert: () => void = (): void => {
  emit('hide')
}
</script>
