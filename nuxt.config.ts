// https://nuxt.com/docs/api/configuration/nuxt-config
import mkcert from "vite-plugin-mkcert";
import tailwindcss from '@tailwindcss/vite'

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
    }
})
