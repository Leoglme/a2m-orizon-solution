import type { GsapAnimationOptions } from '~/services/types/gsap'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { GsapService } from '~/services/gsapService'

/**
 * Vue composable for GSAP scroll animations bound to Storyblok settings.
 */
export function useGsapAnimation(
    options?: GsapAnimationOptions
): { el: Ref<HTMLElement | null> } {
    const el: Ref<HTMLElement | null> = ref(null)

    onMounted(() => {
        GsapService.init()
        if (el.value && options) {
            GsapService.animate(el.value, options)
        }
    })

    return { el }
}
