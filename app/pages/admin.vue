<template>
  <section class="mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 max-w-7xl">
    <header>
      <div
          :class="backgroundColor('purple')"
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

        <div class="mt-4 text-center">
          <h1 class="text-stone-800 text-2xl md:text-3xl lg:text-4xl font-bold my-4 sm:my-6 leading-tight">
            Tableau de bord
          </h1>
          <p class="text-stone-700">
            Mettez à jour le contenu du site et consultez vos statistiques en toute simplicité.
          </p>
        </div>
      </div>
    </header>

    <div class="mt-16 sm:mt-20 mb-4 sm:mb-8">
      <h2 class="text-lg sm:text-xl font-bold leading-7 text-stone-900">
        Liens rapides
      </h2>
    </div>

    <!-- Cartes principales -->
    <div class="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2">
      <!-- Carte Storyblok (sans hover) -->
      <article
          class="group rounded-xl border border-gray-400 overflow-hidden px-3 py-4 sm:p-4"
          :class="backgroundColor('blue')"
      >
        <div class="flex flex-col gap-4 h-full">
          <div class="flex flex-col flex-1 gap-4">
            <h2 class="text-lg sm:text-xl font-bold leading-7 text-stone-900">Gérer le contenu</h2>
            <p class="text-sm text-stone-600">Modifier les textes, images et pages de votre site.</p>

            <ul class="mt-1 list-disc pl-5 text-sm text-stone-700 space-y-1">
              <li>Ouvrez une page, modifiez, puis <strong>Publiez</strong> pour mettre en ligne.</li>
              <li><strong>Enregistrer</strong> sert d’aperçu avant publication.</li>
              <li>Si une zone éditable manque, <strong>actualisez</strong> la page.</li>
            </ul>

            <!-- Banque d’images -->
            <div class="rounded-md border border-gray-400 bg-stone-50 p-4">
              <h3 class="font-semibold text-stone-900">Trouver des images</h3>
              <p class="mt-1 text-sm text-stone-600">
                Sur ces deux sites, vous pouvez trouver de belles images pour votre site :
              </p>
              <div class="mt-2 flex flex-wrap items-center gap-3">
                <A2MLink :link="resources.lummi.url" :color="'#004AAD'">{{ resources.lummi.label }}</A2MLink>
                <A2MLink :link="resources.unsplash.url" :color="'#004AAD'">{{ resources.unsplash.label }}</A2MLink>
              </div>
              <p class="mt-2 text-xs text-stone-500">
                Astuce : privilégiez des visuels clairs, sans texte incrusté, au bon format.
              </p>
            </div>

            <!-- Astuce recherche -->
            <div class="rounded-md border border-gray-400 bg-stone-50 p-4">
              <h3 class="font-semibold text-stone-900">Besoin d’aide ciblée ?</h3>
              <p class="mt-1 text-sm text-stone-600">
                Cherchez <em>Storyblok + votre besoin</em> sur YouTube ou Google.
              </p>
              <p class="mt-1 text-sm text-stone-700">
                Exemple : <code>storyblok modifier un texte</code>
              </p>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 mt-3">
            <A2MButton :to="links.storyblok" size="md" class="w-full">
              Ouvrir l’éditeur
              <ExternalLinkIcon
                  className="w-5 h-5 ml-3 inline-block"
              />
            </A2MButton>
            <A2MLink :link="docs.storyblok" :color="'#1F1F1F'">Aide rapide</A2MLink>
          </div>
        </div>
      </article>

      <!-- Carte Analytics (sans hover) -->
      <article
          class="group rounded-xl border border-gray-400 overflow-hidden px-3 py-4 sm:p-4"
          :class="backgroundColor('light-yellow')"
      >
        <div class="flex flex-col gap-4 h-full">
          <div class="flex flex-col flex-1 gap-4">
            <h2 class="text-lg sm:text-xl font-bold leading-7 text-stone-900">Statistiques du site</h2>
            <p class="text-sm text-stone-600">Consultez les visites et les pages les plus vues.</p>

            <ul class="mt-1 list-disc pl-5 text-sm text-stone-700 space-y-1">
              <li>Choisissez la période (7, 30 jours…)</li>
              <li>Parcourez les rapports (menu du haut)</li>
              <li>Données en temps réel</li>
              <li><em>Sessions</em> : parcours des visiteurs</li>
            </ul>
          </div>

          <div class="flex flex-col wrap items-center gap-3 mt-3">
            <A2MButton :to="links.umami" size="md" class="w-full">
              Ouvrir les statistiques
              <ExternalLinkIcon
                className="w-5 h-5 ml-3 inline-block"
              />
            </A2MButton>
            <A2MLink :link="docs.umami" :color="'#1F1F1F'">Aide rapide</A2MLink>
          </div>
        </div>
      </article>
    </div>


    <div class="mt-16 sm:mt-20 mb-4 sm:mb-8">
      <h2 class="text-lg sm:text-xl font-bold leading-7 text-stone-900">
        Guides vidéo
      </h2>
    </div>

    <!-- Guides vidéo (embeds) -->
    <div class="mt-8 sm:mt-10">
      <div class="grid gap-5 sm:grid-cols-2">
        <article
            v-for="video in videos"
            :key="video.id"
            class="group rounded-xl border border-gray-400 overflow-hidden"
            :class="backgroundColor('beige')"
        >
          <div class="aspect-video bg-[#E8E8EA]">
            <iframe
                :src="toEmbedUrl(video.url)"
                :title="video.title"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                class="w-full h-full"
            />
          </div>
          <div class="px-3 py-4 sm:p-4">
            <h3 class="text-base sm:text-lg font-semibold text-stone-900 leading-snug">
              {{ video.title }}
            </h3>
            <p v-if="video.description" class="mt-1 text-sm text-stone-600">
              {{ video.description }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Aide & contact -->
    <nav
        class="mt-20 grid gap-3 rounded-xl border border-gray-400 px-3 py-4 sm:p-4"
        :class="backgroundColor('blue')"
    >
      <h2 class="text-lg sm:text-xl font-bold leading-7 text-stone-900">Besoin d’aide ?</h2>
      <p class="text-sm text-stone-600">Contactez-nous, on s’occupe du reste.</p>

      <div class="flex flex-wrap items-center gap-3">
        <A2MButton :to="`mailto:${support.email}`" size="sm">
          <MailIcon class="w-4 h-4 mr-3 inline-block" />
          Écrire un e-mail
        </A2MButton>
        <A2MButton :to="`tel:${support.phoneLink}`" size="sm">
          <PhoneIcon class="w-4 h-4 mr-3 inline-block" />
          Appeler
        </A2MButton>
      </div>

      <div class="mt-1 text-sm text-stone-700">
        <p>
          Email :
          <A2MLink :link="`mailto:${support.email}`" :color="'#004AAD'">{{ support.email }}</A2MLink>
        </p>
        <p>
          Téléphone :
          <A2MLink :link="`tel:${support.phoneLink}`" :color="'#004AAD'">{{ support.phone }}</A2MLink>
        </p>
      </div>
    </nav>
  </section>
</template>

<script lang="ts" setup>
import {backgroundColor} from "~/storyblok/backgroundColorClass";
import A2MButton from "~/components/core/A2MButton.vue";
import A2MLink from "~/components/core/A2MLink.vue";
import ExternalLinkIcon from "~/components/icons/ExternalLinkIcon.vue";
import PhoneIcon from "~/components/icons/PhoneIcon.vue";
import MailIcon from "~/components/icons/MailIcon.vue";

/* ========= TYPES ========= */
type UrlString = string

type Links = {
  storyblok: UrlString
  umami: UrlString
}

type ExternalLink = { label: string; url: UrlString }

type Resources = {
  lummi: ExternalLink
  unsplash: ExternalLink
}

type VideoId = 'storyblokLogin' | 'storyblokContent' | 'storyblokBlog' | 'umami'

type Video = {
  id: VideoId
  title: string
  url: UrlString
  description: string
}

type Support = {
  email: string
  phone: string
  phoneLink: string
}

/* ========= DATA ========= */
const links: Links = {
  storyblok:
      'https://app.storyblok.com/#/me/spaces/287711486895708/stories/0/0/index/100031475807343?currentPage=1',
  umami:
      'https://umami.a2m-orizon-solutionsocial.fr/websites/ecbfe143-fc09-4574-917b-413ca729e1ac',
} as const

const resources: Resources = {
  lummi: { label: 'Lummi (bibliothèque d’images)', url: 'https://www.lummi.ai/' },
  unsplash: { label: 'Unsplash (images libres)', url: 'https://unsplash.com/fr' },
} as const

const videos: ReadonlyArray<Video> = [
  {
    id: 'storyblokLogin',
    title: 'Se connecter et accéder à l’espace d’administration',
    url: 'https://www.youtube.com/watch?v=EWwYcIKQ5iU',
    description: 'Où cliquer pour ouvrir l’éditeur et se connecter.',
  },
  {
    id: 'storyblokContent',
    title: 'Modifier et gérer le contenu du site',
    url: 'https://www.youtube.com/watch?v=jhdk7Noi_bY',
    description: 'Comment changer un texte ou une image, puis publier.',
  },
  {
    id: 'storyblokBlog',
    title: 'Gérer les articles du Blog et les pages',
    url: 'https://www.youtube.com/watch?v=scJzKWcVLzA',
    description: 'Créer un article, dupliquer une page, supprimer une page en toute sécurité.',
  },
  {
    id: 'umami',
    title: 'Voir les statistiques du site',
    url: 'https://youtu.be/VIDEO_ID_4',
    description: 'Ouvrir le tableau des visites et lire les chiffres importants.',
  },
] as const

const support: Support = {
  email: 'contact@dibodev.fr',
  phone: '06 42 19 38 12',
  phoneLink: '+33642193812',
}

const docs = {
  storyblok: 'https://www.storyblok.com/docs/manuals/visual-editor',
  umami: 'https://umami.is/docs/filter',
} as const

/* ========= HELPERS ========= */
const toEmbedUrl = (url: string): string => {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
      if (u.pathname.startsWith('/embed/')) return url
    }
    return url
  } catch {
    return url
  }
}
</script>
