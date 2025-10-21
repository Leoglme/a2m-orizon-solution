/**
 * Describes animation settings attached to Storyblok blocks.
 */
export type GsapAnimationType =
    | 'fade-in'
    | 'slide-up'
    | 'slide-left'
    | 'slide-right'
    | 'zoom-in'
    | 'parallax'


/**
 * Strict type for easing options recognized by GSAP.
 */
export type GsapEase =
    | 'none'
    | 'power1.out'
    | 'power2.out'
    | 'power3.out'
    | 'power4.out'
    | 'back.out(1.7)'
    | 'elastic.out(1, 0.5)'
    | 'expo.out'

/**
 * Type defining available animation settings from Storyblok.
 * @property {boolean} [enabled] - Whether the animation is enabled.
 * @property {GsapAnimationType} [type] - The type of animation.
 * @property {number} [duration] - Duration of the animation in seconds.
 * @property {number} [delay] - Delay before the animation starts in seconds.
 * @property {GsapEase} [easing] - Easing function for the animation.
 * @property {number} [stagger] - Stagger time between animations of multiple elements in seconds.
 * @property {number} [parallaxIntensity] - Intensity of parallax effect if applicable.
 */
export type GsapAnimationOptions = {
    enabled?: boolean
    type?: GsapAnimationType
    duration?: number
    delay?: number
    easing?: GsapEase
    stagger?: number
    parallaxIntensity?: number
}
