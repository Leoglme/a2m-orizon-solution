<script setup lang="ts">
const { story } = await useAsyncStoryblok(
    '/pages',
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
