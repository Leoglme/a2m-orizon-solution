// https://nuxt.com/docs/api/configuration/nuxt-config
import mkcert from "vite-plugin-mkcert";
import tailwindcss from '@tailwindcss/vite'
import type {LinksResponse} from "./app/services/types/storyblok";
import {StoryblokService} from "./app/services/storyblokService";

export default defineNuxtConfig({
    app: {
        head: {
            title: 'A2M ÔRIZON SOLUTION - Assistance sociale Paris Île-de-France',
            script: [
                ...(process.env.NODE_ENV === 'production' ? [{
                    src: 'https://umami.a2m-orizon-solutionsocial.fr/script.js',
                    defer: true,
                    'data-website-id': 'ecbfe143-fc09-4574-917b-413ca729e1ac',
                }] : []),
            ],
        },
    },
    runtimeConfig: {
        mailjetApiKey: process.env.MAILJET_API_KEY || '',
        mailjetApiSecret: process.env.MAILJET_API_SECRET || '',
    },
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
    plugins: ['~/plugins/VeeValidate'],
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
                const linksResponse: LinksResponse = await StoryblokService.getLinks()
                const routes: string[] = Object.values(linksResponse.links)
                    .map((link) => link.real_path || link.slug)
                    .filter((route): route is string => !!route)
                // console.log(`Prerender routes: ${JSON.stringify(routes, null, 2)}`)
                for (const route of routes) {
                    ctx.routes.add(route)
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des routes Storyblok:', error)
            }
        },
    },
})
