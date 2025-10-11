// https://nuxt.com/docs/api/configuration/nuxt-config
import mkcert from "vite-plugin-mkcert";
import tailwindcss from '@tailwindcss/vite'
import type {LinksResponse} from "./app/services/types/storyblok";
import {StoryblokService} from "./app/services/storyblokService";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: [
        [
            '@storyblok/nuxt',
            {
                accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
                apiOptions: {
                    region: 'eu',
                },
                usePlugin: true,
            },
        ],
    ],
    devServer: {
        https: true,
    },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            mkcert(),
            tailwindcss()
        ],
    },
    // Dynamically generate routes from Storyblok
    hooks: {
        'prerender:routes': async (ctx) => {
            try {
                const storyblokToken: string | undefined = process.env.STORYBLOK_DELIVERY_API_TOKEN
                if (!storyblokToken) {
                    throw new Error('STORYBLOK_DELIVERY_API_TOKEN is not defined in environment variables')
                }
                const linksResponse: LinksResponse = await StoryblokService.getLinks(storyblokToken)
                const routes: string[] = Object.values(linksResponse.links)
                    .map((link) => link.real_path || link.slug)
                    .filter((route): route is string => !!route)
                console.log(`Prerender routes: ${JSON.stringify(routes, null, 2)}`)
                for (const route of routes) {
                    ctx.routes.add(route)
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des routes Storyblok:', error)
            }
        },
    },
})
