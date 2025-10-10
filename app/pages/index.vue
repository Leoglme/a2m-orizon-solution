<script setup>
const { story } = await useAsyncStoryblok('home', {
  api: {
    version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
  },
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
