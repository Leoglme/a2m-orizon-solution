// https://nuxt.com/docs/api/configuration/nuxt-config
import mkcert from "vite-plugin-mkcert";
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    app: {
        head: {
            title: 'A2M ÔRIZON SOLUTION - Assistance sociale Paris Île-de-France',
            htmlAttrs: { lang: 'fr' },
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
})
