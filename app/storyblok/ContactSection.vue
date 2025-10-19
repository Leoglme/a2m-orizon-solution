<template>
  <section class="self-stretch justify-center px-5 pt-28 pb-40 md:px-20 md:py-24 items-center flex min-h-screen w-full" :id="props.blok.sectionId" :class="sectionClasses" v-editable="props.blok">
    <div class="grid gap-16 sm:gap-28 w-full md:p-10 max-w-[1500px]">
      <div class="mb-6 sm:mb-8">
        <div class="flex items-center justify-center gap-6 sm:gap-8 flex-col sm:flex-row">
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
      <A2MContactForm
        :subjects="props.blok.subjects"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { ContactSectionContent } from '~/content'
export type ContactSectionProps = { blok: ContactSectionContent }
import { computed, ref } from 'vue'
import RichTextView from '~/components/RichText.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";
import ChatIcon from "~/components/icons/ChatIcon.vue";
import A2MContactForm from "~/components/forms/A2MContactForm.vue";

const props: ContactSectionProps = defineProps({
  blok: { type: Object as PropType<ContactSectionContent>, required: true },
})

/* 4) State formulaire */
const loading = ref(false); const submitted = ref(false)
const errorMessage = ref<string | undefined>(); const successMessage = ref<string | undefined>()
/* 5) Styles section */
const sectionClasses: string = `${backgroundColor(
    props.blok.backgroundColor,
)}`

/* Utils */
function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e || '').trim())
}

/* 6) Submit */
async function onSubmit() {
  submitted.value = true
  errorMessage.value = undefined
  successMessage.value = undefined

  if (!fullName.value || !isValidEmail(email.value) || !message.value) {
    errorMessage.value = 'Veuillez compléter les champs requis.'
    return
  }

  loading.value = true
  try {
    const { data, error } = await useFetch<{ message: string }>('/api/mail/contact', {
      method: 'POST',
      body: {
        projectType: subject.value,
        pagesRange: null,
        budget: 0,
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
      },
    })

    if (error.value) {
      errorMessage.value = error.value.statusMessage || 'Erreur serveur. Réessayez plus tard.'
      return
    }

    if (data.value) {
      successMessage.value = 'Votre message a bien été envoyé. Merci !'
      // Reset
      fullName.value = ''
      email.value = ''
      message.value = ''
      submitted.value = false
      subject.value = initialSubject
    }
  } catch {
    errorMessage.value = 'Erreur inattendue.'
  } finally {
    loading.value = false
  }
}
</script>
