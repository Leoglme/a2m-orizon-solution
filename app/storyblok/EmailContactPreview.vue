<template>
  <div
      v-editable="props.blok"
      class="w-full min-h-[60vh] px-5 py-12 flex justify-center"
      :class="backgroundColorClass"
  >
    <div class="w-full max-w-[640px]">
      <header class="flex items-center">
        <img src="https://a2m-orizon-solutionsocial.fr/A2M-ÔRIZON-SOLUTION-LOGO.png" :width="110" alt="Logo A2M ÔRIZON SOLUTION"
             style="display:block;border:0;outline:none;text-decoration:none;height:auto;max-width:100%; border-radius: 100%; margin-bottom: 24px;" />
      </header>

      <div class="mt-5 h-1 w-32 rounded-full"
           :style="{ background: 'linear-gradient(90deg,#E11D48 0%,#F59E0B 100%)' }" />

      <section class="mt-8 space-y-6 text-slate-800">
        <h1 v-if="props.blok.title" class="text-2xl font-semibold tracking-tight mb-12">
          {{ render(props.blok.title) }}
        </h1>

        <div v-if="props.blok.body"
             class="prose max-w-none prose-p:my-4 prose-a:text-sky-700 hover:prose-a:text-sky-600 prose-strong:text-slate-900 leading-8">
          <div v-html="render(props.blok.body)" />
        </div>

        <div v-if="props.blok.ctaLabel && href" class="pt-2">
          <A2MButton
              :to="href"
              size="lg"
              class="inline-flex items-center gap-2 font-semibold
                   bg-transparent hover:bg-transparent text-slate-900
                   border border-slate-300 hover:border-slate-400
                   px-5 py-2.5 rounded-lg"
          >
            {{ render(props.blok.ctaLabel) }}
          </A2MButton>
        </div>
      </section>

      <footer v-if="props.blok.footer" class="mt-10 pt-6 border-t border-slate-200">
        <div class="text-sm font-semibold leading-relaxed text-slate-700">
          <div v-html="render(props.blok.footer)" />
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import type { EmailContactTemplateContent } from '~/content'
import type { ContactFormPayload } from '~~/server/types/mail/contact'
import type { LinkContent as TLinkContent } from '~/delivery-api'
import A2MButton from '~/components/core/A2MButton.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";

/** Props */
export interface EmailContactPreviewProps {
  blok: EmailContactTemplateContent
  vars: ContactFormPayload
}
const props: EmailContactPreviewProps = defineProps({
  blok: { type: Object as PropType<EmailContactTemplateContent>, required: true },
  vars: { type: Object as PropType<ContactFormPayload>, required: true },
})


const backgroundColorClass: ComputedRef<string> = computed(() => backgroundColor(props.blok.backgroundColor) || 'bg-white')

/** CTA link */
const href: ComputedRef<string | null> = computed(() => {
  const l: TLinkContent | undefined = props.blok.ctaLink
  if (!l) return null
  switch (l.linktype) {
    case 'email': return l.email ? `mailto:${l.email.trim()}` : null
    case 'url':
    case 'asset': return (l.cached_url || '').trim() || null
    case 'story': {
      const p = (l.cached_url || '').trim()
      return p ? `/${p.replace(/^\//, '')}` : null
    }
    default: return null
  }
})

/** Replacing variables for preview*/
function render(input?: string): string {
  if (!input) return ''
  return input
      .replaceAll('{{name}}', props.vars.name)
      .replaceAll('{{email}}', props.vars.email)
      .replaceAll('{{subject}}', props.vars.subject)
      .replaceAll('{{{nl2br message}}}', escapeHtml(props.vars.message).replace(/\r?\n/g, '<br/>'))
      .replaceAll('{{message}}', escapeHtml(props.vars.message))
}

/** Basic HTML escaping */
function escapeHtml(s: string): string {
  return s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;')
}
</script>
