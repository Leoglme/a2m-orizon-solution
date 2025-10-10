import type {
    BlockContent,
    LinkContent,
    AssetContent,
    RichTextContent,
} from '~/delivery-api'

export type Content =
    | HeroContent
    | ButtonContent

export type BackgroundColor =
    | 'beige'
    | 'white'
    | 'grey'
    | 'purple'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'pink'
    | 'blue'

export type HeroContent = BlockContent<{
    component: 'hero'
    image?: AssetContent
    imagePadding: boolean
    textAlignment: 'left' | 'right' | 'center'
    description: RichTextContent
    backgroundColor: BackgroundColor
    buttons: ButtonContent[]
}>

export type ButtonContent = BlockContent<{
    component: 'button'
    text: string
    link?: LinkContent
    color: 'primary' | 'secondary'
}>
