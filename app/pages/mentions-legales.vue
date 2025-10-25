<script setup lang="ts">
import type { ComputedRef } from 'vue';
import type {PageStory, StoryResponse} from "~/services/types/storyblok";
import type { RouteLocationNormalizedLoadedGeneric } from "#vue-router";
import { computed } from 'vue';
import { useRoute } from 'nuxt/app';
import {StoryblokService} from "~/services/storyblokService";
import meta from "~~/meta";

const route: RouteLocationNormalizedLoadedGeneric = useRoute();
const isStoryblokEditor: boolean = !!route.query._storyblok;
const storyPath: string = 'pages/mentions-legales';



const pageStory: StoryResponse<PageStory> = await StoryblokService.getStoryBySlug<PageStory>(storyPath, isStoryblokEditor ? 'draft' : 'published');

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
    storyPath,
    {
      bridge: {},
      api: {
        version: isStoryblokEditor ? 'draft' : 'published',
      },
    }
);
</script>

<template>
  <div class="BIDULE p-4 md:p-8 lg:px-16 lg:py-4">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
