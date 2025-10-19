/**
 * Interface for the Space response from Storyblok API.
 * @interface SpaceResponse
 * @property {object} space - The space details.
 * @property {number} space.id - The ID of the space.
 * @property {string} space.name - The name of the space.
 * @property {string} space.domain - The domain of the space.
 * @property {number} space.version - The version of the space.
 * @property {string[]} space.language_codes - The language codes of the space.
 */
export interface SpaceResponse {
    space: {
        id: number;
        name: string;
        domain: string;
        version: number;
        language_codes: string[];
    };
}

/**
 * Interface for a single link in Links response from Storyblok API.
 * @interface StoryblokLink
 * @property {number} id - The ID of the link.
 * @property {string} uuid - The UUID of the link.
 * @property {string} slug - The slug of the link.
 * @property {string | null} path - The path of the link.
 * @property {number | null} parent_id - The parent ID of the link.
 * @property {string} name - The name of the link.
 * @property {boolean} is_folder - Indicates if the link is a folder.
 * @property {boolean} published - Indicates if the link is published.
 * @property {boolean} is_startpage - Indicates if the link is a start page.
 * @property {number} position - The position of the link.
 * @property {string} real_path - The real path of the link.
 */
export interface StoryblokLink {
    id: number;
    uuid: string;
    slug: string;
    path: string | null;
    parent_id: number | null;
    name: string;
    is_folder: boolean;
    published: boolean;
    is_startpage: boolean;
    position: number;
    real_path: string;
}

/**
 * Interface for the Links response from Storyblok API.
 * @interface LinksResponse
 * @property {Record<string, StoryblokLink>} links - A record of links keyed by UUID.
 */
export interface LinksResponse {
    links: Record<string, StoryblokLink>;
}


/**
 * Interface for the Story response from Storyblok API.
 * @interface StoryResponse
 * @template TStory - The type of the story content.
 * @property {TStory} story - The story data.
 */
export interface StoryResponse<TStory> {
    story: TStory
}
