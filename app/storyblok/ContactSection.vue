<template>
  <section class="self-stretch justify-center px-5 pt-28 pb-40 md:px-20 md:py-24 items-center flex min-h-screen w-full" :id="props.blok.sectionId" :class="sectionClasses" v-editable="props.blok">
    <div class="grid gap-16 sm:gap-28 w-full md:p-10 max-w-[1500px]">
      <div class="mb-6 sm:mb-8">
        <div ref="titleRef" class="flex items-center justify-center gap-6 sm:gap-8 flex-col sm:flex-row">
          <ChatIcon
              className="w-10 h-10 sm:w-12.5 sm:h-12.5"
          />
          <h2 class="text-center text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ props.blok.title || 'Envoyez-nous un message' }}
          </h2>
        </div>

        <slot v-if="props.blok.description">
          <RichTextView :doc="props.blok.description" :blok="props.blok" />
        </slot>
      </div>
      <!-- FORM -->
      <A2MCallbackForm
        v-if="activeSubjectValue === 'rappel'"
        :subjects="props.blok.subjects"
        :activeSubject="activeSubjectValue"
        @update:subject="activeSubjectValue = $event"
      />
      <A2MContactForm
        v-else
        :subjects="props.blok.subjects"
        :activeSubject="activeSubjectValue"
        @update:subject="activeSubjectValue = $event"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import type {ContactSectionContent, AnimationSettingsContent, PillOptionContent} from '~/content'
export type ContactSectionProps = { blok: ContactSectionContent }
import { ref, onMounted } from 'vue'
import RichTextView from '~/components/RichText.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";
import ChatIcon from "~/components/icons/ChatIcon.vue";
import A2MContactForm from "~/components/forms/A2MContactForm.vue";
import {GsapService} from "~/services/gsapService";
import A2MCallbackForm from "~/components/forms/A2MCallbackForm.vue";

const props: ContactSectionProps = defineProps({
  blok: { type: Object as PropType<ContactSectionContent>, required: true },
})

/* 5) Styles section */
const sectionClasses: string = `${backgroundColor(
    props.blok.backgroundColor,
)}`


/* -------- Refs pour GSAP -------- */
const titleRef: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  const titleAnimBlk: AnimationSettingsContent | undefined = props.blok.titleAnimation?.[0]

  if (titleRef.value && titleAnimBlk && titleAnimBlk.enabled) {
    GsapService.animate(titleRef.value, titleAnimBlk) // ex: type 'slide-up'
  }
})

const activeSubjectValue: Ref<string> = ref(props.blok.subjects.find((subject: PillOptionContent) => subject.active)?.value || '')
</script>
