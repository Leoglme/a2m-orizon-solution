<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script lang="ts" setup>
import meta from '../meta'

useHead({
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk ? `${titleChunk} | ${meta.name}` : meta.title;
  },
});

useSeoMeta({
  title: meta.title,
  ogTitle: meta.title,
  description: meta.description,
  ogDescription: meta.description,
  ogImage: `${meta.url}/A2M-ÔRIZON-SOLUTION-LOGO.png`, // Ajoute une image personnalisée si disponible
  twitterCard: 'summary_large_image',
});
</script>
