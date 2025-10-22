import type {
    SpaceResponse,
    LinksResponse,
    StoryResponse,
    StoriesResponse,
    StoryblokLinkSiteMapEntry,
    StoryblokLink
} from '~/services/types/storyblok';
import type {BlogArticleContent} from '~/content'

/**
 * Class for interacting with Storyblok API.
 * Provides static methods to fetch space details and links.
 */
export class StoryblokService {
    private static _storyblokApiToken: string | undefined = process.env.STORYBLOK_DELIVERY_API_TOKEN;


    /**
     * Returns the API token from runtime config (publicly exposed for client-side usage)
     */
    private static get storyblokApiToken(): string {
        if (this._storyblokApiToken) {
            return this._storyblokApiToken
        } else {
            if(import.meta.client) {
                const config = useRuntimeConfig()
                return config.public.storyblok.accessToken || ''
            } else {
                throw new Error('Storyblok API token is not defined in environment variables or runtime config.')
            }
        }
    }

    /**
     * Fetches the space details from Storyblok API.
     * @private
     * @static
     * @returns {Promise<SpaceResponse>} A promise that resolves to the space response.
     * @throws {Error} If the API request fails.
     */
    private static async getSpaceMe(): Promise<SpaceResponse> {
        const url: string = `https://api.storyblok.com/v2/cdn/spaces/me?token=${this.storyblokApiToken}`;
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch space: ${response.statusText}`);
        }
        const data: SpaceResponse = await response.json();
        return data;
    }

    /**
     * Fetches the links from Storyblok API using the published version.
     * @static
     * @returns {Promise<LinksResponse>} A promise that resolves to the links response.
     * @throws {Error} If the API request fails.
     */
    public static async getLinks(): Promise<LinksResponse> {
        const space: SpaceResponse = await this.getSpaceMe();
        const cv: number = space.space.version;
        const url: string = `https://api.storyblok.com/v2/cdn/links?cv=${cv}&token=${this.storyblokApiToken}&version=published`;
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch links: ${response.statusText}`);
        }
        const data: LinksResponse = await response.json();
        return data;
    }

    /**
     * Fetches a single story by slug from the Storyblok CDN API.
     * Uses `version=published` by default (with `cv` for cache-busting);
     * falls back to `draft` if explicitly requested.
     *
     * @template TStory Story payload shape (content will be strongly typed).
     * @param {string} slug - The story slug, e.g. "emails/email-contact".
     * @param {'draft'|'published'} [version='published'] - Story version to fetch.
     * @returns {Promise<StoryResponse<TStory>>} Resolves to the story response.
     * @throws {Error} If the API request fails.
     */
    public static async getStoryBySlug<TStory>(
        slug: string,
        version: 'draft' | 'published' = 'published',
    ): Promise<StoryResponse<TStory>> {
        let url: string

        if (version === 'published') {
            const space: SpaceResponse = await this.getSpaceMe()
            const cv: number = space.space.version
            url = `https://api.storyblok.com/v2/cdn/stories/${encodeURIComponent(slug)}?token=${this.storyblokApiToken}&version=published&cv=${cv}`
        } else {
            url = `https://api.storyblok.com/v2/cdn/stories/${encodeURIComponent(slug)}?token=${this.storyblokApiToken}&version=draft`
        }

        const response: Response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to fetch story "${slug}": ${response.status} ${response.statusText}`)
        }

        const data: StoryResponse<TStory> = await response.json()
        return data
    }

    /**
     * Fetch a list of stories with optional parameters.
     * Use it to list blog posts inside /blog folder with content_type 'blog_article'.
     */
    public static async getStories<TContent>(
        params: Record<string, string | number> = {}
    ): Promise<StoriesResponse<TContent> & { total: number; perPage: number; page: number }> {
        const space: SpaceResponse = await this.getSpaceMe()
        const cv: number = space.space.version

        const search = new URLSearchParams({
            token: this.storyblokApiToken,
            version: 'published',
            cv: String(cv),
            ...Object.fromEntries(
                Object.entries(params).map(([k, v]) => [k, String(v)])
            ),
        })

        const url: string = `https://api.storyblok.com/v2/cdn/stories?${search.toString()}`
        const response: Response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Failed to fetch stories: ${response.status} ${response.statusText}`)
        }

        const data: StoriesResponse<TContent> = await response.json()
        const totalHeader = response.headers.get('total')
        const perPageHeader = response.headers.get('per-page')
        const pageParam = Number(params.page ?? 1)

        const total = totalHeader ? Number(totalHeader) : data.stories.length
        const perPage = perPageHeader ? Number(perPageHeader) : Number(params.per_page ?? 25)

        return Object.assign(data, {total, perPage, page: pageParam})
    }

    /**
     * Convenience helper to list blog posts under /blog with pagination.
     */
    public static async getBlogPosts(
        page: number = 1,
        perPage: number = 9
    ): Promise<StoriesResponse<BlogArticleContent> & { total: number; perPage: number; page: number }> {
        return this.getStories<BlogArticleContent>({
            content_type: 'blogArticle',
            sort_by: 'first_published_at:desc',
            page,
            per_page: perPage,
        })
    }

    /**
     * Fetches sitemap entries from Storyblok links.
     * @static
     * @returns {Promise<StoryblokLinkSiteMapEntry[]>} A promise that resolves to an array of sitemap entries.
     * @throws {Error} If the API request fails.
     */
    public static async getSitemapEntries(): Promise<StoryblokLinkSiteMapEntry[]> {
        const storyblokLinks: LinksResponse = await this.getLinks();
        const sitemapEntries: StoryblokLinkSiteMapEntry[] = []

        Object.values(storyblokLinks.links).forEach((link) => {
            const path: string | null = link.real_path || link.path;

            // exclude folders, non-published links, emails, and admin paths
            if (
                link.is_folder || !link.published || link.slug.startsWith('emails/') || link.slug.startsWith('admin') ||
                !path
            ) {
                return;
            }

            sitemapEntries.push({
                loc: path,
                lastmod: new Date().toISOString().split('T')[0],
            })
        })

        return sitemapEntries;
    }
}
