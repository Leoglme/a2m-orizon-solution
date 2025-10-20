<template>
  <article class="group rounded-xl border border-[#E8E8EA] overflow-hidden bg-white px-3 py-4 sm:p-4 hover:border-stone-900 transition-all duration-200 ease-linear">
    <NuxtLink :to="`/${story.path || story.full_slug}`" class="grid gap-5">
      <div class="overflow-hidden">
        <img
            v-if="story.content.coverImage?.filename"
            :src="story.content.coverImage.filename"
            :alt="story.content.coverImage.alt || story.name"
            class="w-full h-60 object-cover transition-all duration-200 ease-linear group-hover:scale-110 rounded-md"
            loading="lazy"
        />
        <div v-else class="w-full h-60 bg-[#E8E8EA] object-cover transition-all duration-200 ease-linear group-hover:scale-110 rounded-md" />
      </div>

      <div class="grid gap-3">
        <div
            v-if="showCategory && story.content.category?.trim()"
            class="text-xs leading-5 font-semibold normal-case tracking-wide px-2.5 py-1 rounded-md text-primary-light bg-primary/10 w-fit"
        >
          {{ story.content.category }}
        </div>

        <h3 class="mx-0 mb-0 mt-1 text-lg font-bold leading-snug line-clamp-2 text-stone-800">
          {{ story.content.title }}
        </h3>

        <p v-if="story.content.description?.trim()" class="m-0 text-sm text-stone-600 line-clamp-2">
          {{ story.content.description }}
        </p>

        <div class="mt-3 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <img
                src="/A2M-ÔRIZON-SOLUTION-LOGO.png"
                :alt="story.content.author || 'A2M ÔRIZON SOLUTION'"
                class="h-7 w-7 rounded-full object-cover"
                loading="lazy"
            />

            <span>{{ story.content.author || 'A2M ÔRIZON SOLUTION' }}</span>
          </div>

          <div class="flex items-center gap-2">
            <span>{{ publishedAtLabel }}</span>
            <span aria-hidden="true">•</span>
            <span>{{ readingMinutesLabel }}</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { PropType, ComputedRef } from 'vue'
import { computed } from 'vue'
import type { BlogArticleContent } from '~/content'
import type { StoryblokStory } from '~/services/types/storyblok'

/* TYPES */
export type BlogPostCardProps = {
  story: StoryblokStory<BlogArticleContent>
  showCategory?: boolean
}

/* PROPS */
const props: BlogPostCardProps = defineProps({
  story: { type: Object as PropType<StoryblokStory<BlogArticleContent>>, required: true },
  showCategory: { type: Boolean as PropType<boolean>, required: false, default: true },
})

/* COMPUTED */
const publishedAtLabel: ComputedRef<string> = computed(() => {
  const iso: string = props.story.first_published_at || props.story.published_at || props.story.created_at
  return new Date(iso).toLocaleDateString('fr-FR')
})

const readingMinutesLabel: ComputedRef<string> = computed(() => {
  // basic words count on title + meta + no richtext parse to keep it cheap
  const text: string = `${props.story.content.title} ${props.story.content.description || ''} ${props.story.content.body ? JSON.stringify(props.story.content.body) : ''}`
  const words: number = text.trim().split(/\s+/).length
  const minutes: number = Math.max(1, Math.round(words / 100))
  return `${minutes} min`
})
</script>
