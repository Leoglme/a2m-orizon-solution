<template>
  <Form v-slot="{ meta }" ref="callbackForm" class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <!-- Objet -->
    <div class="flex flex-col gap-4">
      <A2MLabel id="subject">
        Objet de votre demande
      </A2MLabel>

      <A2MTogglePillGroup
          v-model:value="subject"
          :options="normalizedOptions"
      />

      <Field name="objet de votre demande" rules="required" as="input" type="hidden" v-model="subject" />
      <ErrorMessage name="objet de votre demande" class="text-sm text-red-500" />
    </div>

    <!-- Téléphone -->
    <A2mInput
        id="phone"
        label="Numéro de téléphone"
        type="tel"
        :value="phone"
        :rules="'required|phone'"
        :placeholder="placeholders.phone"
        @update:value="phone = $event.toString()"
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
        {{ isSubmitting ? 'Envoi en cours...' : 'Être rappelé' }}
        <PhoneIcon className="ml-3" />
      </A2MButton>
    </div>
  </Form>
</template>

<script setup lang="ts">
import type { FormContext } from 'vee-validate'
import type { PropType, ComputedRef, Ref } from 'vue'
import type { PillOptionContent } from '~/content'
import type { ContactFormPayload } from '~~/server/types/mail/contact'
import type { Option as ToggleOption } from '~/components/ui/A2MTogglePillGroup.vue'
import A2mInput from "~/components/core/A2mInput.vue"
import PhoneIcon from "~/components/icons/PhoneIcon.vue"
import A2MButton from "~/components/core/A2MButton.vue"
import A2MTogglePillGroup from "~/components/ui/A2MTogglePillGroup.vue"
import A2MLabel from "~/components/core/A2MLabel.vue"
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref, computed, watch } from 'vue'
import A2MAlert from "~/components/feedback/A2MAlert.vue"

// === Types ===
export type A2MCallbackFormProps = {
  subjects: PillOptionContent[]
  activeSubject?: string
  placeholders?: string
}

/* PROPS */
const props: A2MCallbackFormProps = defineProps({
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

/* COMPUTED */
// Normalisation des options pour A2MTogglePillGroup
const normalizedOptions: ComputedRef<ToggleOption[]> = computed(() =>
    (props.subjects || []).map((p: PillOptionContent) => ({
      label: p.label,
      value: p.value || p.label,
    }))
)

// Gestion sécurisée des placeholders JSON
const rawPlaceholders: ComputedRef<{ phone?: string }> = computed(() => {
  try {
    return JSON.parse(props.placeholders || '{}')
  } catch {
    return {}
  }
})

const placeholders: ComputedRef<{ phone: string }> = computed(() => ({
  phone: rawPlaceholders.value.phone || '06 51 62 23 06',
}))

/* INITIAL SUBJECT */
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
const phone: Ref<string> = ref('')
const errorMessage: Ref<string | null> = ref(null)
const successMessage: Ref<string | null> = ref(null)
const isSubmitting: Ref<boolean> = ref(false)
const callbackForm: Ref<FormContext | null> = ref(null)

/* EMITS */
const emit = defineEmits<{
  (e: 'update:subject', value: string): void
}>()

watch(subject, (newVal) => {
  emit('update:subject', newVal)
})

/* METHODS */
function resetFormValues(): void {
  subject.value = initialSubject
  phone.value = ''
  callbackForm.value?.resetForm({
    values: {
      'objet de votre demande': initialSubject,
      phone: '',
    },
  })
}

async function onSubmit(): Promise<void> {
  errorMessage.value = null
  successMessage.value = null
  isSubmitting.value = true

  const payload: ContactFormPayload = {
    subject: subject.value.trim(),
    phone: phone.value.trim(),
    message: `Demande de rappel téléphonique au ${phone.value.trim()}"`,
  }

  try {
    const { data, error } = await useFetch<{ message: string }>('/api/mail/contact', {
      method: 'POST',
      body: payload,
    })

    if (error.value) {
      const fallback = error.value.status === 400
          ? 'Numéro invalide ou sujet manquant.'
          : 'Service indisponible, veuillez réessayer.'
      errorMessage.value = error.value.data?.message || error.value.statusMessage || fallback
      console.error('Callback form error:', error.value)
      return
    }

    if (data.value) {
      successMessage.value = 'Nous vous rappellerons dans un délai maximum de 48 heures.'
      resetFormValues()
    }
  } catch (err) {
    console.error('Unexpected error in callback form:', err)
    errorMessage.value = 'Erreur inattendue. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
