<template>
  <section class="mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 max-w-7xl">
    <header>
      <div
          :class="backgroundColor(props.blok.introBackgroundColor)"
          class="rounded-xl px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 grid gap-8 sm:gap-0">
        <!-- ligne avatar + nom/role -->
        <div class="flex items-center justify-center gap-4">
          <img
              src="/A2M-ÔRIZON-SOLUTION-LOGO.png"
              alt="A2M ÔRIZON SOLUTION"
              class="h-16 w-16 rounded-full object-cover"
              loading="lazy"
          />
          <div class="grid gap-1.5">
            <p class="text-base sm:text-lg font-bold text-stone-900 leading-tight">A2M ÔRIZON SOLUTION</p>
            <p class="text-sm text-stone-500 leading-tight">
              Le travail social autrement.
            </p>
          </div>
        </div>

        <div v-if="props.blok.intro" class="mt-4 text-left text-stone-700">
          <RichTextView :doc="props.blok.intro" :blok="props.blok" />
        </div>
      </div>
    </header>

    <div class="mt-20 mb-8">
      <h2 class="text-lg sm:text-xl font-bold leading-7 text-stone-900">
        Derniers articles
      </h2>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <BlogPostCard
          v-for="post in posts"
          :key="post.uuid"
          :story="post"
          :show-category="props.blok.showCategory ?? true"
          :show-author="true"
      />
    </div>

    <!-- Pagination -->
    <nav
        v-if="totalPages > 1"
        class="mt-10 flex items-center justify-center gap-4 sm:gap-8">
      <A2MButton
          size="sm"
          backgroundColor="#1B232D"
          :disabled="page <= 1"
          :to="page > 1 ? `?page=${page - 1}` : undefined"
      >
        Précédent
      </A2MButton>
      <span class="text-sm sm:text-base text-stone-900">Page {{ page }} / {{ totalPages }}</span>
      <A2MButton
          size="sm"
          backgroundColor="#1B232D"
          :disabled="page >= totalPages"
          :to="page < totalPages ? `?page=${page + 1}` : undefined"
      >
        Suivant
      </A2MButton>
    </nav>
  </section>
</template>

<script setup lang="ts">
import type {PropType, Ref, ComputedRef} from 'vue'
import type {BlogListContent, BlogArticleContent} from '~/content'
import type {StoriesResponse, StoryblokStory} from '~/services/types/storyblok'
import type { RouteLocationNormalizedLoadedGeneric, LocationQueryValue } from "#vue-router";
import { useRoute } from 'nuxt/app';
import {ref, computed} from 'vue'
import { useSeoMeta } from '#imports'
import {StoryblokService} from '~/services/storyblokService'
import BlogPostCard from '~/components/blog/BlogPostCard.vue'
import RichTextView from '~/components/RichText.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";
import A2MButton from "~/components/core/A2MButton.vue";

/* SEO */
useSeoMeta({
  title: 'Nos derniers articles - Blog A2M ÔRIZON SOLUTION',
  description: 'Découvrez les derniers articles de notre blog sur le travail social, les innovations et les meilleures pratiques. Restez informé avec A2M ÔRIZON SOLUTION.',
  ogTitle: 'Nos derniers articles - Blog A2M ÔRIZON SOLUTION',
  ogDescription: 'A2M ÔRIZON SOLUTION - Découvrez les derniers articles de notre blog sur le travail social, les innovations et les meilleures pratiques.',
  ogImage: 'https://a2m-orizon-solutionsocial.fr/A2M-ÔRIZON-SOLUTION-LOGO.png',
  twitterCard: 'summary_large_image',
})


/* TYPES */
export type BlogListProps = { blok: BlogListContent }

/* PROPS */
const props: BlogListProps = defineProps({
  blok: {type: Object as PropType<BlogListContent>, required: true},
})

/* STATE */
const page: Ref<number> = ref(1)
const perPage: ComputedRef<number> = computed(() => props.blok.perPage ?? 9)
const posts: Ref<Array<StoryblokStory<BlogArticleContent>>> = ref([])
const total: Ref<number> = ref(0)

/* COMPUTED */
const totalPages: ComputedRef<number> = computed(() =>
    Math.max(1, Math.ceil(total.value / perPage.value))
)

/* METHODS */
const load = async (): Promise<void> => {
  const latestArticles: StoriesResponse<BlogArticleContent> & {total: number, perPage: number, page: number} = await StoryblokService.getBlogPosts(page.value, perPage.value)
  posts.value = latestArticles.stories
  total.value = latestArticles.total
}

const parsePage = (q: LocationQueryValue | LocationQueryValue[] | undefined): number => {
  const n: number = q ? Number(q) : 1
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1
}

/* ROUTE */
const route: RouteLocationNormalizedLoadedGeneric
    = useRoute()

/* WATCHERS */
/* SYNC route.query.page -> page (et charger) */
watch(
    () => route.query.page,
    (q) => {
      const next: number = parsePage(q)
      if (next !== page.value) page.value = next
    },
    { immediate: true },
)

/* Charger quand page/perPage changent */
watch([page, perPage], () => { void load() }, { immediate: true })
</script>
