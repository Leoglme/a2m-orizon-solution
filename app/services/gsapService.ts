import type {GsapAnimationOptions} from "~/services/types/gsap";
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

/**
 * Static service class providing helper methods to animate elements with GSAP.
 */
export class GsapService {
    private static _initialized: boolean = false

    /**
     * Initialize GSAP plugins once.
     */
    public static init(): void {
        if (!import.meta.client || this._initialized) return
        gsap.registerPlugin(ScrollTrigger)
        this._initialized = true
    }

    /**
     * Animate a DOM element based on provided Storyblok animation settings.
     * @param {HTMLElement} el - Target element to animate.
     * @param {GsapAnimationOptions} options - Animation configuration.
     * @returns {void}
     */
    public static animate(el: HTMLElement, options: GsapAnimationOptions): void {
        if (!import.meta.client || !el || !options.enabled) return

        const base: gsap.TweenVars = {
            duration: options.duration ?? 0.8,
            delay: options.delay ?? 0,
            ease: options.easing ?? 'power3.out',
        }

        switch (options.type) {
            case 'fade-in':
                gsap.from(el, { opacity: 0, ...base, scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } })
                break

            case 'slide-up':
                gsap.from(el, { opacity: 0, y: 80, ...base, scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } })
                break

            case 'slide-left':
                gsap.from(el, { opacity: 0, x: -80, ...base, scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } })
                break

            case 'slide-right':
                gsap.from(el, { opacity: 0, x: 80, ...base, scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } })
                break

            case 'zoom-in':
                gsap.from(el, { opacity: 0, scale: 0.85, ...base, scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } })
                break

            case 'parallax': {
                const intensity: number = options.parallaxIntensity ?? 20

                gsap.fromTo(
                    el,
                    { yPercent: 0 },
                    {
                        yPercent: -intensity,
                        ease: 'none',
                        immediateRender: false,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top top',      // 👈 élément atteint le haut du viewport
                            end: 'bottom top',     // 👈 fin du mouvement
                            scrub: true,
                            invalidateOnRefresh: true,
                            markers: false,        // tu peux mettre true pour debugger
                            onUpdate: (self: ScrollTrigger) => {
                                // Sécurité pour éviter tout décalage initial sur le Hero
                                if (self.progress <= 0) gsap.set(el, { yPercent: 0 })
                            },
                        },
                    }
                )
                break
            }
            default:
                gsap.from(el, { opacity: 0, ...base, scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } })
                break
        }
    }

    /**
     * Animate multiple elements in a staggered fashion.
     * @param {HTMLElement[]} elements - Array of elements.
     * @param {GsapAnimationOptions} options - Animation configuration with optional stagger.
     */
    public static animateGroup(elements: HTMLElement[], options: GsapAnimationOptions): void {
        if (!import.meta.client || elements.length === 0 || !options.enabled) return
        const base: gsap.TweenVars = {
            duration: options.duration ?? 0.8,
            delay: options.delay ?? 0,
            ease: options.easing ?? 'power3.out',
            stagger: options.stagger ?? 0.15,
        }

        gsap.from(elements, {
            opacity: 0,
            y: 40,
            ...base,
            scrollTrigger: {
                trigger: elements[0],
                start: 'top 90%',
            },
        })
    }
}
