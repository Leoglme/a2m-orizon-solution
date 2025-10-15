<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'nuxt/app';
import type { RouteLocationNormalizedLoadedGeneric } from "#vue-router";

const route: RouteLocationNormalizedLoadedGeneric = useRoute();
const slug: string | string[] | undefined  = route.params.slug;
const isStoryblokEditor = !!route.query._storyblok;

const storyPath: ComputedRef<string> = computed(() => {
  console.log({
    slug,
  })
  if (!slug) return '/pages'

  // Concatenate array to get the full slug path (e.g., ['about', 'team'] -> 'about/team')
  const concatSlug: string = Array.isArray(slug) ? slug.join('/') : slug;

  return `/pages/${concatSlug}`
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
