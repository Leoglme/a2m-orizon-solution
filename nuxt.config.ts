// https://nuxt.com/docs/api/configuration/nuxt-config
import type { StoryblokLinkSiteMapEntry } from './app/services/types/storyblok';
import mkcert from "vite-plugin-mkcert";
import tailwindcss from '@tailwindcss/vite'
import meta from './meta'
import {StoryblokService} from "./app/services/storyblokService";

export default defineNuxtConfig({
    app: {
        head: {
            title: meta.title,
            htmlAttrs: { lang: 'fr' },
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'manifest', href: '/site.webmanifest' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            ],
            meta: [
                { name: 'theme-color', content: '#004AAD' },
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
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
        storyblokDeliveryApiToken: process.env.NUXT_STORYBLOK_DELIVERY_API_TOKEN || '',
        mailjetApiKey: process.env.NUXT_MAILJET_API_KEY || '',
        mailjetApiSecret: process.env.NUXT_MAILJET_API_SECRET || '',
        public: {
            storyblok: {
                accessToken: process.env.NUXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || '',
            }
        }
    },
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: [[
        '@storyblok/nuxt',
        {
            accessToken: process.env.NUXT_STORYBLOK_DELIVERY_API_TOKEN,
            apiOptions: {
                region: 'eu',
            },
            usePlugin: true,
        },
    ], '@nuxtjs/seo'],
    devServer: {
        https: true,
    },
    ssr: true,
    site: {
        url: meta.url,
        name: meta.name,
        description: meta.description,
        defaultLocale: 'fr',
    },
    ogImage: { enabled: false },
    sitemap: {
        enabled: true,
        exclude: ['/admin', '/404', '/emails/*'],
        autoLastmod: true,
        discoverImages: true,
        urls: async () => {
            const storyblokSitemap: StoryblokLinkSiteMapEntry[] = await StoryblokService.getSitemapEntries()

            return storyblokSitemap
        },
    },
    schemaOrg: {
        identity: {
            type: 'Organization',
            name: meta.name,
            url: meta.url,
            logo: `${meta.url}/android-chrome-512x512.png`
        },
    },
    linkChecker: { enabled: true },
    seo: { enabled: true },
    robots: {
        enabled: true,
        disallow: ['/admin', '/404', '/emails/*'],
        sitemap: `${meta.url}/sitemap.xml`,
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
