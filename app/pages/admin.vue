<template>
  <main
      class="min-h-[80vh] w-full px-4 sm:px-8 md:px-20 py-12 h-screen"
      :class="backgroundColor('beige')"
  >
    <div class="mx-auto max-w-5xl space-y-12">
      <!-- En-tête -->
      <header class="space-y-4">
        <A2MLogo
            :size="40"
            large
        />
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-10">
          Tableau de bord
        </h1>
        <p class="text-stone-600">
          Ici, vous pouvez mettre à jour le contenu du site et consulter vos statistiques de visites.
        </p>
      </header>

      <!-- Bloc actions principales -->
      <section class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- Carte Storyblok -->
        <div class="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 class="text-xl font-bold mb-2">Gérer le contenu</h2>
          <p class="text-stone-600 mb-5">
            Modifier les textes, images et pages de votre site.
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <A2MButton
                :to="links.storyblok"
                size="md"
            >
              Ouvrir l’éditeur
            </A2MButton>

            <A2MLink
                :link="docs.storyblok"
                :color="'#1F1F1F'"
            >
              Aide rapide
            </A2MLink>
          </div>

          <ul class="mt-5 list-disc pl-5 text-sm text-stone-600 space-y-1">
            <li>Pour modifier une page : cliquez sur son nom, puis changez le contenu et <strong>Publiez</strong>.</li>
            <li>Le bouton <strong>Enregistrer</strong> montre le rendu avant la publication.</li>
          </ul>
        </div>

        <!-- Carte Analytics -->
        <div class="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 class="text-xl font-bold mb-2">Statistiques du site</h2>
          <p class="text-stone-600 mb-5">
            Voir le nombre de visites et les pages les plus consultées.
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <A2MButton
                :to="links.umami"
                size="md"
            >
              Ouvrir les statistiques
            </A2MButton>

            <A2MLink
                :link="docs.umami"
                :color="'#1F1F1F'"
            >
              Aide rapide
            </A2MLink>
          </div>

          <ul class="mt-5 list-disc pl-5 text-sm text-stone-600 space-y-1">
            <li>Choisissez la période en haut à droite (7 jours, 30 jours, etc.).</li>
            <li>Explorez les différents rapports dans le menu en haut de la page.</li>
            <li>Les données sont mises à jour en temps réel.</li>
            <li>Dans l'onglet <em>Sessions</em>, vous pouvez suivre le parcours des visiteurs sur votre site.</li>
          </ul>
        </div>
      </section>

      <!-- Bloc aide & contact -->
      <section class="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 class="text-xl font-bold mb-2">Besoin d’aide ?</h2>
        <p class="text-stone-600 mb-5">
          Si quelque chose bloque, contactez-nous, on s’occupe du reste.
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <A2MButton :to="`mailto:${support.email}`" size="md">Écrire un e-mail</A2MButton>
          <A2MButton :to="`tel:${support.phoneLink}`" size="md">Appeler</A2MButton>
        </div>

        <div class="mt-4 text-stone-600 text-sm">
          <p>Email : <A2MLink :link="`mailto:${support.email}`" :color="'#004AAD'">{{ support.email }}</A2MLink></p>
          <p>Téléphone : <A2MLink :link="`tel:${support.phoneLink}`" :color="'#004AAD'">{{ support.phone }}</A2MLink></p>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import A2MButton from '~/components/core/A2MButton.vue'
import A2MLink from '~/components/core/A2MLink.vue'
import {backgroundColor} from "~/storyblok/backgroundColorClass";
import A2MLogo from "~/components/branding/A2MLogo.vue";

/**
 * Liens — adapte si besoin avec des variables d’environnement.
 */
const links = {
  storyblok:
      'https://app.storyblok.com/#/me/spaces/287711486895708/stories/0/0/index/100031475807343?currentPage=1',
  umami:
      'https://umami.a2m-orizon-solutionsocial.fr/websites/ecbfe143-fc09-4574-917b-413ca729e1ac',
}

const docs = {
  storyblok: 'https://www.storyblok.com/docs/guide/introduction',
  umami: 'https://umami.is/docs/filter',
}

/** Coordonnées support */
const support = {
  email: 'contact@dibodev.fr',
  phone: '06 42 19 38 12',
  phoneLink: '+33642193812',
}
</script>

<style scoped>
/* Rien d’obligatoire ici : la page s’appuie sur tes composants + Tailwind */
</style>
