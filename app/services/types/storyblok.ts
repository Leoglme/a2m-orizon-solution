import type {ISbStoryData} from '@storyblok/js'
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
 * @property {StoryblokStory<TStory>} story - The story details.
 */
export interface StoryResponse<TStory> {
    story: StoryblokStory<TStory>
}


/**
 * Type representing a Storyblok story with generic content type.
 * @template T - The type of the story content.
 * @property {string} name - The name of the story.
 * @property {string} created_at - The creation date of the story.
 * @property {string} [updated_at] - The last updated date of the story (optional).
 * @property {string | null} published_at - The publication date of the story, or null if not published.
 * @property {string | null} first_published_at - The first publication date of the story, or null if not published.
 * @property {number} id - The ID of the story.
 * @property {string} uuid - The UUID of the story.
 * @property {string} slug - The slug of the story.
 * @property {string} full_slug - The full slug of the story.
 * @property {string} [path] - The path of the story (optional).
 * @property {T} content - The content of the story.
 */
export type StoryblokStory<T> = {
    name: string
    created_at: string
    updated_at?: string
    published_at: string | null
    first_published_at: string | null
    id: number
    uuid: string
    slug: string
    full_slug: string
    path?: string
    content: T
}

/**
 * Type representing the Stories response from Storyblok API with generic content type.
 * @template T - The type of the story content.
 * @property {Array<StoryblokStory<T>>} stories - An array of Storyblok stories.
 * @property {number} cv - The cache version number.
 */
export type StoriesResponse<T> = {
    stories: Array<StoryblokStory<T>>
    cv: number
}

/**
 * Type representing a Storyblok link entry for sitemap generation.
 * @property {string} loc - The location URL of the sitemap entry.
 * @property {string} [lastmod] - The last modification date of the sitemap entry (optional).
 */
export type StoryblokLinkSiteMapEntry = {
    loc: string;
    lastmod?: string;
    images: Array<{
        loc: string
        title: string
        caption?: string
    }>
}

/** Story typed with our blok. */
export type PageStory = Omit<ISbStoryData, 'content'> & {
    seo_title?: string;
    seo_description?: string;
}
