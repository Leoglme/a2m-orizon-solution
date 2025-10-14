import type { BackgroundColor } from '~/content'

export const backgroundColor = (backgroundColor: BackgroundColor): string => {
    switch (backgroundColor) {
        case 'beige':
            return 'bg-[#f4f2e9]'
        case 'white':
            return 'bg-white'
        case 'grey':
            return 'bg-[#f5f5f7]'
        case 'purple':
            return 'bg-[#EAE9F4]'
        case 'orange':
            return 'bg-[#FFE7D3]'
        case 'yellow':
            return 'bg-[#F2C97B]'
        case 'light-yellow':
            return 'bg-[#FFF0D3]'
        case 'green':
            return 'bg-[#EFF4E9]'
        case 'pink':
            return 'bg-[#FECCD4]'
        case 'blue':
            return 'bg-[#D9E6F6]'
    }
}
