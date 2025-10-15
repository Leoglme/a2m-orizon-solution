<template>
  <slot>
    <MailIcon v-if="props.iconType === 'mail'" :className="props.className"/>
    <PhoneIcon v-else-if="props.iconType === 'phone'" :className="props.className"/>
    <MapPinIcon v-else-if="props.iconType === 'map-pin'" :className="props.className"/>
  </slot>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {ContantItemContentIconType} from "~/content";
import MailIcon from '~/components/icons/MailIcon.vue'
import PhoneIcon from '~/components/icons/PhoneIcon.vue'
import MapPinIcon from '~/components/icons/MapPinIcon.vue'

export type ContantIconProps = {
  iconType: ContantItemContentIconType
  className?: string
}

const props: ContantIconProps = defineProps({
  iconType: {
    type: String as PropType<ContantItemContentIconType>,
    required: true,
  },
  className: {
    type: String as PropType<string>,
    required: false,
    default: undefined,
  },
})
</script>
