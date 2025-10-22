import type {
    StoryblokStory
} from '~/services/types/storyblok';
import type { Content } from '~/content'
import type {AssetContent, RichTextContent} from "~/delivery-api";

/**
 * Class for extracting assets from Storyblok stories.
 * Provides static methods to extract images from story content.
 * @class StoryblokAssetService
 */
export class StoryblokAssetService {
    /**
     * Extracts all images from a Storyblok story
     * @param {StoryblokStory<Content>} story - The Storyblok story object
     * @returns {AssetContent[]} An array of extracted AssetContent images
     */
    public static extractImagesFromStory(story: StoryblokStory<Content>): AssetContent[] {
        const images: AssetContent[] = []

        if (!story?.content) return images
        this.extractImagesRecursively(story.content, images)
        return this.deduplicateImages(images)
    }

    /**
     * Extracts images recursively from an object
     * @private
     * @param {any} obj - The object to extract images from
     * @param {AssetContent[]} images - The array to store extracted images
     */
    private static extractImagesRecursively(obj: any, images: AssetContent[]): void {
        if (!obj || typeof obj !== 'object') return

        // ✅ 1. AssetContent direct (image, icon, coverImage, etc.)
        if (this.isAssetContent(obj)) {
            images.push(obj)
            return
        }

        // ✅ 2. RichTextContent → extrait les images inline
        if (this.isRichTextContent(obj)) {
            this.extractImagesFromRichText(obj, images)
            return
        }

        // ✅ 3. Arrays → récursion sur chaque élément
        if (Array.isArray(obj)) {
            obj.forEach(item => this.extractImagesRecursively(item, images))
            return
        }

        // ✅ 4. Objets → parcours de toutes les propriétés
        Object.values(obj).forEach(value => {
            this.extractImagesRecursively(value, images)
        })
    }

    /**
     * Extracts images from RichTextContent
     * @private
     * @param {RichTextContent} richText - The RichTextContent object
     * @param {AssetContent[]} images - The array to store extracted images
     */
    private static extractImagesFromRichText(richText: RichTextContent, images: AssetContent[]): void {
        if (!richText?.content) return

        // Parcours récursif du content RichText
        this.extractImagesRecursively(richText.content, images)
    }

    /**
     * Verify if the object is an AssetContent
     * @private
     * @param {any} obj - The object to check
     * @returns {boolean} True if the object is an AssetContent, false otherwise
     */
    private static isAssetContent(obj: any): obj is AssetContent {
        if (!obj || typeof obj !== 'object') return false

        const hasImageField = obj.filename || obj.src
        const hasAssetId = typeof obj.id === 'number'
        const hasFieldtype = obj.fieldtype === 'asset'
        return hasImageField && (hasAssetId || hasFieldtype)
    }

    /**
     * Verify if the object is a RichTextContent
     * @private
     * @param {any} obj - The object to check
     * @returns {boolean} True if the object is a RichTextContent, false otherwise
     */
    private static isRichTextContent(obj: any): obj is RichTextContent {
        return obj &&
            typeof obj === 'object' &&
            obj.type === 'doc' &&
            Array.isArray(obj.content)
    }

    /**
     * Deduplicates images based on their filename or src
     * @private
     * @param {AssetContent[]} images - The array of images to deduplicate
     * @returns {AssetContent[]} The deduplicated array of images
     */
    private static deduplicateImages(images: AssetContent[]): AssetContent[] {
        const seen = new Set<string>()
        return images.filter(img => {
            const filename = img.filename || img.src || ''
            if (seen.has(filename)) return false
            seen.add(filename)
            return true
        })
    }
}
