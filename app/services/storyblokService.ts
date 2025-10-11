import type { SpaceResponse, LinksResponse } from '~/services/types/storyblok';

/**
 * Class for interacting with Storyblok API.
 * Provides static methods to fetch space details and links.
 */
export class StoryblokService {
    /**
     * Fetches the space details from Storyblok API.
     * @private
     * @static
     * @param {string} token - The API token for authentication.
     * @returns {Promise<SpaceResponse>} A promise that resolves to the space response.
     * @throws {Error} If the API request fails.
     */
    private static async getSpaceMe(token: string): Promise<SpaceResponse> {
        const url: string = `https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`;
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
     * @param {string} token - The API token for authentication.
     * @returns {Promise<LinksResponse>} A promise that resolves to the links response.
     * @throws {Error} If the API request fails.
     */
    public static async getLinks(token: string): Promise<LinksResponse> {
        const space: SpaceResponse = await this.getSpaceMe(token);
        const cv: number = space.space.version;
        const url: string = `https://api.storyblok.com/v2/cdn/links?cv=${cv}&token=${token}&version=published`;
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch links: ${response.statusText}`);
        }
        const data: LinksResponse = await response.json();
        return data;
    }
}
