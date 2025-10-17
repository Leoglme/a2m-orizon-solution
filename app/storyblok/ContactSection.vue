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
      <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
        <!-- Objet -->
        <div class="flex flex-col gap-4">
          <A2MLabel id="subject">
            Objet de votre message
          </A2MLabel>

          <A2MTogglePillGroup
              v-model:value="subject"
              :options="normalizedOptions"
          />
        </div>

        <!-- Nom / Email -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <A2mInput
              id="fullName"
              label="Nom et prénom"
              :value="fullName"
              :rules="'required'"
              :placeholder="placeholders.name"
              :invalid="submitted && !fullName"
              @update:value="fullName = ($event as string)"
          />
          <A2mInput
              id="email"
              label="Email"
              type="email"
              :value="email"
              :rules="'required|email'"
              :placeholder="placeholders.email"
              :invalid="submitted && !isValidEmail(email)"
              @update:value="email = ($event as string)"
          />
        </div>

        <!-- Message -->
        <A2mInput
            id="message"
            label="Message"
            :rows="6"
            :value="message"
            :rules="'required'"
            :placeholder="placeholders.message"
            :invalid="submitted && !message"
            @update:value="message = ($event as string)"
        />

        <!-- Bouton -->
        <div class="flex justify-end">
          <A2MButton
              v-if="props.blok.button?.[0]"
              class="self-center w-full sm:w-auto"
              to="/"
              :size="props.blok.button?.[0]?.size"
              :disabled="false"
          >
            {{ loading ? 'Envoi en cours…' : (props.blok.button?.[0]?.text || 'Envoyer mon message') }}
            <SendIcon className="ml-3" />
          </A2MButton>
        </div>

        <!-- Messages -->
        <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-sm text-green-700">{{ successMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType, ComputedRef, Ref } from 'vue'
import type { ContactSectionContent, PillOptionContent } from '~/content'
import type { Option as ToggleOption } from '~/components/ui/A2MTogglePillGroup.vue'
export type ContactSectionProps = { blok: ContactSectionContent }
import { computed, ref } from 'vue'
import RichTextView from '~/components/RichText.vue'
import Button from './Button.vue'
import A2MTogglePillGroup from '~/components/ui/A2MTogglePillGroup.vue'
import A2mInput from '~/components/core/A2mInput.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";
import ChatIcon from "~/components/icons/ChatIcon.vue";
import A2MButton from "~/components/core/A2MButton.vue";
import A2MLabel from "~/components/core/A2MLabel.vue";
import SendIcon from "~/components/icons/SendIcon.vue";

const props: ContactSectionProps = defineProps({
  blok: { type: Object as PropType<ContactSectionContent>, required: true },
})

/* 1) Standardized pill options (with a Storyblok active flag) */
const normalizedOptions: ComputedRef<ToggleOption[]> = computed(() =>
    (props.blok.subjects || []).map((p: PillOptionContent) => ({
      label: p.label,
      value: p.value || p.label,
    }))
)

/** 2) Initial subject: takes the 1st 'active' option, otherwise the first */
const initialSubject: string = (() => {
  const s: PillOptionContent[] = props.blok.subjects || []
  const active: PillOptionContent | undefined = s.find((p) => p.active)
  return (
      (active?.value || active?.label) ||
      (s[0]?.value || s[0]?.label) ||
      ''
  )
})()

/** 3) State */
const subject: Ref<string> = ref(initialSubject)

/* 3) Placeholders JSON (avec fallback) */
const rawPlaceholders = computed(() => {
  try { return JSON.parse(props.blok.placeholders || '{}') }
  catch { return {} }
}) as ComputedRef<{ name?: string; email?: string; message?: string }>

const placeholders = computed(() => ({
  name: rawPlaceholders.value.name || 'John Doe',
  email: rawPlaceholders.value.email || 'email@exemple.com',
  message: rawPlaceholders.value.message || 'Votre message…',
}))

/* 4) State formulaire */
const fullName = ref<string>(''); const email = ref<string>(''); const message = ref<string>('')
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
