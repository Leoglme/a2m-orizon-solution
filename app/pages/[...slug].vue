<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'nuxt/app';
import type { RouteLocationNormalizedLoadedGeneric } from "#vue-router";

const route: RouteLocationNormalizedLoadedGeneric = useRoute();
const isStoryblokEditor = !!route.query._storyblok;

/**
 * Normalizes the URL segments of the current route into a table.
 */
const slugSegments: ComputedRef<string[]> = computed(() => {
  const p: string | string[] | undefined = route.params?.slug
  if (!p) return []
  return Array.isArray(p) ? p : [p]
})

/**
 * Builds the normalized Storyblok path based on route slug segments.
 *
 * Rules:
 *  - []                         → "pages"
 *  - ["emails", ...rest]        → "emails/<rest>" | "emails"
 *  - ["blog"]                   → "blog/blog"     (special case: blog index)
 *  - ["blog", ...rest]          → "blog/<rest>"
 *  - ["pages", ...rest]         → "pages/<rest>"  | "pages"
 *  - [<anything else> ...rest]  → "pages/<all>"
 *
 * @param {ComputedRef<string[]>} slugSegments - Reactive array of current route slug segments.
 * @returns {ComputedRef<string>} Computed Storyblok story path.
 *
 * @example
 * // [] → "pages"
 * // ["blog"] → "blog/blog"
 * // ["blog","mon-article"] → "blog/mon-article"
 * // ["emails","welcome"] → "emails/welcome"
 * // ["about"] → "pages/about"
 */
const storyPath: ComputedRef<string> = computed((): string => {
  const rawSegments: readonly string[] = slugSegments.value
  const segments: string[] = [...rawSegments].filter(Boolean)

  if (segments.length === 0) return 'pages'

  const first: string = segments[0] ?? ''

  /**
   * Builds the path with a given prefix from the remaining segments.
   * @param {string} prefix
   * @returns {string}
   */
  const buildPath = (prefix: string): string => {
    if(segments[0] === prefix) {
      segments.shift()
    }
    const rest: string = segments.join('/')
    return rest ? `${prefix}/${rest}` : prefix
  }

  switch (first) {
    case 'emails':
      return buildPath('emails')

    case 'blog':
      // special case: blog root should resolve to "blog/blog"
      if (segments.length === 1) return 'blog/blog'
      return buildPath('blog')

    case 'pages':
      return buildPath('pages')

    default:
      // anything else resolves under "pages"
      return buildPath('pages')
  }
})



const { story } = await useAsyncStoryblok(
    storyPath.value,
    {
      bridge: {},
      api: {
        version: isStoryblokEditor ? 'draft' : 'published',
      },
    }
);
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
