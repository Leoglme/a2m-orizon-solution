<template>
  <AlertCircleIcon
    v-if="computedIcon === 'AlertCircle'"
    className="text-red-600 mr-3 -mb-1"
  />
  <CheckCircleIcon
    v-else-if="computedIcon === 'CheckCircle'"
    className="text-green-600 mr-3 -mb-1"
  />
  <XCircleIcon
    v-else-if="computedIcon === 'XCircle'"
    className="text-yellow-600 mr-3 -mb-1"
  />
  <InfoIcon
    v-else-if="computedIcon === 'Info'"
    className="text-blue-600 mr-3 -mb-1"
  />
</template>

<script lang="ts" setup>
import type { PropType, ComputedRef } from 'vue'
import type { A2MAlertVariant } from '~/components/feedback/A2MAlert.vue'
import { computed } from 'vue'
import AlertCircleIcon from "~/components/icons/AlertCircleIcon.vue";
import CheckCircleIcon from "~/components/icons/CheckCircleIcon.vue";
import XCircleIcon from "~/components/icons/XCircleIcon.vue";
import InfoIcon from "~/components/icons/InfoIcon.vue";

export type A2MAlertIconProps = {
  variant?: A2MAlertVariant
}

/*  PROPS  */
const props: A2MAlertIconProps = defineProps({
  variant: {
    type: String as PropType<A2MAlertVariant>,
    default: 'Info',
  },
})

const computedIcon: ComputedRef<string> = computed(() => {
  switch (props.variant) {
    case 'error':
      return 'AlertCircle'
    case 'success':
      return 'CheckCircle'
    case 'warning':
      return 'XCircle'
    case 'info':
      return 'Info'
    default:
      return 'Info'
  }
})
</script>
