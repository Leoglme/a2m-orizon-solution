<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'nuxt/app';
import type { RouteLocationNormalizedLoadedGeneric } from "#vue-router";

const route: RouteLocationNormalizedLoadedGeneric = useRoute();
const slug: string | string[] | undefined  = route.params.slug;
const storyPath: ComputedRef<string> = computed(() => {
  if(!slug) {
    return 'home';
  }
  if(typeof slug === 'string') {
    return `/pages/${slug}`;
  }
  if(Array.isArray(slug) && slug.length > 0) {
    return `/pages/${slug.join('/')}`;
  } else {
    return 'home';
  }
});
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
