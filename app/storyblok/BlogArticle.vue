<template>
  <article class="container mx-auto px-4 md:px-6 lg:px-8 py-12 max-w-4xl blog-article">
    <header class="mb-8">
      <p
          v-if="props.blok.category?.trim()"
          v-editable="props.blok"
          class="text-xs sm:text-sm leading-5 font-semibold normal-case tracking-wide px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-primary-light bg-primary/10 w-fit">
        {{ props.blok.category }}
      </p>

      <h1 v-editable="props.blok"
          class="mt-4 mb-5 text-2xl sm:text-3xl md:text-4xl leading-8 sm:leading-10 font-extrabold text-stone-800">
        {{ props.blok.title }}
      </h1>

      <p v-if="props.blok.description?.trim()" v-editable="props.blok" class="mt-10 mb-10 sm:mb-12 text-stone-600">
        {{ props.blok.description }}
      </p>

      <div v-editable="props.blok"
           class="mt-4 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-6 sm:gap-3">
        <div class="flex items-center gap-2">
          <img
              src="/A2M-ÔRIZON-SOLUTION-LOGO.png"
              :alt="authorLabel"
              class="h-7 w-7 rounded-full object-cover"
              loading="lazy"
          />

          <span>{{ authorLabel }}</span>
        </div>

        <div class="flex items-center gap-2">
          <span>
             Publié le {{ publishedAt }}
          </span>
          <span aria-hidden="true">•</span>
          <span>
            {{ readingMinutesLabel }} de lecture
          </span>
        </div>
      </div>
    </header>

    <figure v-if="props.blok.coverImage?.filename" v-editable="props.blok" class="mb-8 overflow-hidden rounded-xl">
      <img
          :src="props.blok.coverImage.filename"
          :alt="props.blok.coverImage.alt || props.blok.title"
          class="w-full h-auto object-cover"
          loading="lazy"
      />
    </figure>

    <div v-editable="props.blok" class="prose prose-stone max-w-none prose-img:rounded-lg">
      <RichTextView :doc="props.blok.body" :blok="props.blok"/>
    </div>
  </article>
</template>

<script setup lang="ts">
import type {PropType, Ref, ComputedRef} from 'vue'
import type {BlogArticleContent} from '~/content'
import type {StoryResponse} from '~/services/types/storyblok'
import {ref, computed, onMounted} from 'vue'
import RichTextView from '~/components/RichText.vue'
import {useRoute, useSeoMeta} from '#imports'
import {StoryblokService} from '~/services/storyblokService'

/* TYPES */
export type BlogArticleProps = { blok: BlogArticleContent }

/* PROPS */
const props: BlogArticleProps = defineProps({
  blok: {type: Object as PropType<BlogArticleContent>, required: true},
})

/* STATE */
const route = useRoute()
const publishedAtISO: Ref<string> = ref('')

/* SEO */
useSeoMeta({
  title: `${props.blok.title} — A2M ÔRIZON SOLUTION`,
  description: props.blok.description || '',
  ogTitle: `${props.blok.title} — A2M ÔRIZON SOLUTION`,
  ogDescription: props.blok.description || '',
  ogImage: props.blok.coverImage?.filename || '',
  twitterCard: 'summary_large_image',
})

/* COMPUTED */
const publishedAt: ComputedRef<string> = computed(() =>
    publishedAtISO.value ? new Date(publishedAtISO.value).toLocaleDateString('fr-FR') : ''
)

const authorLabel: ComputedRef<string> = computed(() =>
    props.blok.author?.trim() || 'A2M ÔRIZON SOLUTION'
)

const readingMinutesLabel: ComputedRef<string> = computed(() => {
  // naive reading time based on meta + title (richtext parsing = out of scope here)
  const text: string = `${props.blok.title} ${props.blok.description || ''} ${props.blok.body ? JSON.stringify(props.blok.body) : ''}`
  const words: number = text.trim().split(/\s+/).length
  const minutes: number = Math.max(1, Math.round(words / 100))
  return `${minutes} min`
})

/* LIFECYCLE */
// We fetch the story meta to get first_published_at reliably.
onMounted(async () => {
  const slug: string = String(route.fullPath).replace(/^\//, '')
  const res: StoryResponse<BlogArticleContent> = await StoryblokService.getStoryBySlug<BlogArticleContent>(slug, 'published')
  publishedAtISO.value = res.story.first_published_at || res.story.published_at || res.story.created_at
})
</script>
