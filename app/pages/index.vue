<script setup>
const { story } = await useAsyncStoryblok('home', {
  api: {
    version: 'draft', // or 'published'
  },
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
