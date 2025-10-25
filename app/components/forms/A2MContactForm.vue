<template>
  <Form v-slot="{ meta }" ref="contactForm" class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <!-- Objet -->
    <div class="flex flex-col gap-4">
      <A2MLabel id="subject">
        Objet de votre message
      </A2MLabel>

      <A2MTogglePillGroup
          v-model:value="subject"
          :options="normalizedOptions"
      />

      <Field name="objet de votre message" rules="required" as="input" type="hidden" v-model="subject" />
      <ErrorMessage name="objet de votre message" class="text-sm text-red-500" />
    </div>

    <!-- Nom / Email -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <A2mInput
          id="nom"
          label="Nom et prénom"
          :value="name"
          :rules="'required'"
          :placeholder="placeholders.name"
          @update:value="name = $event.toString()"
      />
      <A2mInput
          id="email"
          label="Email"
          type="email"
          :value="email"
          :rules="'required|email'"
          :placeholder="placeholders.email"
          @update:value="email = $event.toString()"
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
        @update:value="message = $event.toString() "
    />

    <A2MAlert v-if="errorMessage" :message="errorMessage" variant="error" dismissible @hide="errorMessage = null" />
    <A2MAlert
        v-if="successMessage"
        :message="successMessage"
        variant="success"
        dismissible
        @hide="successMessage = null"
    />

    <!-- Bouton -->
    <div class="flex justify-end">
      <A2MButton
          type="submit"
          class="self-center w-full sm:w-auto"
          size="lg"
          :disabled="!meta.valid || isSubmitting"
          @click="onSubmit"
      >
        {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer mon message' }}
        <SendIcon className="ml-3" />
      </A2MButton>
    </div>
  </Form>
</template>
<script setup lang="ts">
import type { FormContext } from 'vee-validate'
import type { ContactFormPayload } from '~~/server/types/mail/contact'
import type { PropType, ComputedRef, Ref } from 'vue'
import type { PillOptionContent } from '~/content'
import type { Option as ToggleOption } from '~/components/ui/A2MTogglePillGroup.vue'
import A2mInput from "~/components/core/A2mInput.vue";
import SendIcon from "~/components/icons/SendIcon.vue";
import A2MButton from "~/components/core/A2MButton.vue";
import A2MTogglePillGroup from "~/components/ui/A2MTogglePillGroup.vue";
import A2MLabel from "~/components/core/A2MLabel.vue";
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref, computed } from 'vue'
import A2MAlert from "~/components/feedback/A2MAlert.vue";

export type A2MContactFormProps = {
  subjects: PillOptionContent[]
  activeSubject?: string
  placeholders?: string
}

/* PROPS */
const props: A2MContactFormProps = defineProps({
  subjects: {
    type: Array as PropType<PillOptionContent[]>,
    required: true,
  },
  activeSubject: {
    type: String,
    default: null,
  },
  placeholders: {
    type: String,
    default: null,
  },
})


/*  COMPUTED */
/* 1) Standardized pill options (with a Storyblok active flag) */
const normalizedOptions: ComputedRef<ToggleOption[]> = computed(() =>
    (props.subjects || []).map((p: PillOptionContent) => ({
      label: p.label,
      value: p.value || p.label,
    }))
)

const rawPlaceholders: ComputedRef<{ name?: string; email?: string; message?: string }> = computed(() => {
  try { return JSON.parse(props.placeholders || '{}') }
  catch { return {} }
})

const placeholders: ComputedRef<{
  name: string
  email: string
  message: string
}> = computed(() => ({
  name: rawPlaceholders.value.name || 'John Doe',
  email: rawPlaceholders.value.email || 'email@exemple.com',
  message: rawPlaceholders.value.message || 'Votre message…',
}))


/* DATA */

/** 2) Initial subject: takes the 1st 'active' option, otherwise the first */
const initialSubject: string = (() => {
  const s: PillOptionContent[] = props.subjects || []
  const findSubjectByActiveSubject: PillOptionContent | undefined = props.activeSubject
      ? s.find((p) => (p.value || p.label) === props.activeSubject)
      : undefined

  if(findSubjectByActiveSubject) {
    return findSubjectByActiveSubject.value || findSubjectByActiveSubject.label
  }

  const active: PillOptionContent | undefined = s.find((p) => p.active)
  return (
      (active?.value || active?.label) ||
      (s[0]?.value || s[0]?.label) ||
      ''
  )
})()


/* REFS */
const subject: Ref<string> = ref(initialSubject)
const name = ref<string>('');
const email = ref<string>('');
const message = ref<string>('')
const errorMessage: Ref<string | null> = ref(null)
const successMessage: Ref<string | null> = ref(null)
const isSubmitting: Ref<boolean> = ref(false)
const contactForm: Ref<FormContext | null> = ref(null)

/* METHODS */
/** Reset form fields */
function resetFormValues(): void {
  subject.value = initialSubject
  name.value = ''
  email.value = ''
  message.value = ''
  contactForm.value?.resetForm({
    values: {
      'objet de votre message': initialSubject,
      nom: '',
      email: '',
      message: '',
    },
  })
}

/** Handles form submission */
async function onSubmit(): Promise<void> {
  errorMessage.value = null
  successMessage.value = null
  isSubmitting.value = true

  const payload: ContactFormPayload = {
    subject: subject.value.trim(),
    name: name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim(),
  }

  try {
    const { data, error } = await useFetch<{ message: string }>('/api/mail/contact', {
      method: 'POST',
      body: payload,
    })

    if (error.value) {
      const fallbackMessage: string =
          error.value.status === 400
              ? 'Le formulaire est invalide. Veuillez vérifier vos informations.'
              : 'Erreur serveur. Veuillez réessayer plus tard.'
      const errorResponseMessage: string =
          error.value.statusMessage || error.value.data?.message || error.value.message || fallbackMessage

      console.error('onSubmit: Failed to send contact form:', error.value)
      errorMessage.value = errorResponseMessage
      isSubmitting.value = false
      return
    }

    if (data.value) {
      successMessage.value =
          'Nous revenons vers vous dans un délai maximum de 48 heures, un accusé de réception vous a été envoyé par email.'
      resetFormValues()
    }
  } catch (err) {
    console.error('onSubmit: Unexpected error:', err)
    errorMessage.value = 'Erreur inattendue. Veuillez réessayer plus tard.'
  } finally {
    isSubmitting.value = false
  }
}

const emit = defineEmits<{
  (e: 'update:subject', value: string): void
}>()

/* WATCHERS */
// watch subject and emit update event
watch(subject, (newValue: string) => {
  emit('update:subject', newValue)
})
</script>
