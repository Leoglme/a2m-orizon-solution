import type { SpaceResponse, LinksResponse, StoryResponse } from '~/services/types/storyblok';
/**
 * Class for interacting with Storyblok API.
 * Provides static methods to fetch space details and links.
 */
export class StoryblokService {
    private static storyblokApiToken: string = process.env.STORYBLOK_DELIVERY_API_TOKEN || '';

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
    // curl https://api.storyblok.com/v2/cdn/stories?token=cEVXQyEfdp8Qtf2xaaSd3Qtt&version=draft
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
}
