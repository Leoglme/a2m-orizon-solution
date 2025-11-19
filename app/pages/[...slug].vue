<script setup lang="ts">
import type { ComputedRef } from 'vue';
import type {PageStory, StoryResponse} from "~/services/types/storyblok";
import type { RouteLocationNormalizedLoadedGeneric } from "#vue-router";
import { computed } from 'vue';
import { useRoute } from 'nuxt/app';
import {StoryblokService} from "~/services/storyblokService";
import meta from "~~/meta";
import { createError } from 'h3';

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

// Gérer les erreurs 404 pour les articles supprimés
let pageStory: StoryResponse<PageStory>
try {
  pageStory = await StoryblokService.getStoryBySlug<PageStory>(storyPath.value, isStoryblokEditor ? 'draft' : 'published');
} catch (error: any) {
  // Si l'article n'existe pas (404), retourner une 404 proprement
  if (error?.statusCode === 404 || error?.message?.includes('404')) {
    throw createError({ 
      statusCode: 404, 
      statusMessage: 'Page not found',
      fatal: false 
    })
  }
  // Pour les autres erreurs, les propager
  throw error
}

const pageTitle: ComputedRef<string> = computed(() => {
  return pageStory.story.content.seo_title || pageStory.story.name || meta.title;
});

const pageDescription: ComputedRef<string> = computed(() => {
  return pageStory.story.content.seo_description || meta.description;
});

const slug: ComputedRef<string> = computed(() => {
  const path: string | undefined = pageStory.story.path && pageStory.story.path[0] !== '/' ? '/' + pageStory.story.path : undefined;
  return path || route.fullPath;
})

const canonicalUrl: ComputedRef<string> = computed(() => {
  return `${meta.url}${slug.value}`;
});

const lastModified: ComputedRef<string> = computed(() => {
  return pageStory.story.updated_at || pageStory.story.created_at || new Date().toISOString();
});

const ogTitle: ComputedRef<string> = computed(() => {
  return `${pageTitle.value} - ${meta.name}`;
});

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  meta: [
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:site_name', content: meta.name },
    { property: 'og:type', content: 'website' }
  ]
})

useSeoMeta({
  title: pageTitle,
  ogTitle,
  description: pageDescription,
  ogDescription: pageDescription,
});

useSchemaOrg(() => [
  {
    '@type': 'WebPage',
    name: pageTitle.value,
    description: pageDescription.value,
    url: canonicalUrl.value,
    dateModified: lastModified.value,
  },
  {
    '@type': 'Organization',
    name: meta.name,
    url: meta.url,
  },
  {
    '@type': 'Service',
    name: pageTitle.value,
    provider: { '@id': meta.url },
    areaServed: 'FR',
    description: pageDescription.value,
  },
]);


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
