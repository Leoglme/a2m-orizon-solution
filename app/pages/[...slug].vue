<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'nuxt/app';
import type { RouteLocationNormalizedLoadedGeneric } from "#vue-router";

const route: RouteLocationNormalizedLoadedGeneric = useRoute();
const slug: string | string[] | undefined  = route.params.slug;
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
 * Built the Storyblok story path:
 * - racine → "pages"
 * - si 1er segment === "emails" → "emails/<reste>"
 * - sinon → "pages/<tous les segments>"
 */
const storyPath: ComputedRef<string> = computed(() => {
  const segments: string[] = slugSegments.value.filter(Boolean)
  if (segments.length === 0) return 'pages'

  if (segments[0] === 'emails') {
    const rest: string = segments.slice(1).join('/')
    return rest ? `emails/${rest}` : 'emails'
  }

  return `pages/${segments.join('/')}`
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
