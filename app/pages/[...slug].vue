<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'nuxt/app';
import type { RouteLocationNormalizedLoadedGeneric } from "#vue-router";

const route: RouteLocationNormalizedLoadedGeneric = useRoute();
const slug: string | string[] | undefined  = route.params.slug;

const storyPath: ComputedRef<string> = computed(() => {
  if (!slug) return '/pages'

  const last: string =
      Array.isArray(slug) && slug.length > 0
          ? slug[slug.length - 1] || ''
          : typeof slug === 'string'
              ? slug
              : ''

  return `/pages/${last}`
})

const { story } = await useAsyncStoryblok(
    storyPath.value,
    {
      bridge: {},
      api: {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      },
    }
);
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
