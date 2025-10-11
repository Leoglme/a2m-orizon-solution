import type {
    BlockContent,
    LinkContent,
    AssetContent,
    RichTextContent,
} from '~/delivery-api'

export type Content =
    | HeroContent
    | ButtonContent
    | PageContent
    | CardsContent
    | CardContent
    | TabsContent
    | TabContent

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

export type PageContent = BlockContent<{
    component: 'page'
    body: Content[]
}>

export type CardContent = BlockContent<{
    component: 'card'
    description: RichTextContent
    icon?: AssetContent
}>

export type CardsContent = BlockContent<{
    component: 'cards'
    description: RichTextContent
    cards: CardContent[]
}>

export type TabContent = BlockContent<{
    component: 'tab'
    title: string
    content: Content[]
}>

export type TabsContent = BlockContent<{
    component: 'tabs'
    description: RichTextContent
    tabs: TabContent[]
}>
