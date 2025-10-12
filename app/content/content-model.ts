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
    | FaqContent
    | FaqItemContent
    | MapSectionContent
    | MapContent
    | ContactSectionContent
    | PillOptionContent

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


export type FaqItemContent = BlockContent<{
    component: 'faq_item'
    question: string
    answer: RichTextContent
    defaultOpen?: boolean
}>

export type FaqContent = BlockContent<{
    component: 'faq'
    title?: string
    description?: RichTextContent
    items: FaqItemContent[]
    backgroundColor: BackgroundColor
    allowMultipleOpen?: boolean
}>


export type MapContent = BlockContent<{
    component: 'map'
    latitude: number
    longitude: number
    zoom: number
    mapType: 'roadmap' | 'satellite'
    height?: number
    title?: string
    address?: string
}>

export type MapSectionContent = BlockContent<{
    component: 'map_section'
    title?: string
    description?: RichTextContent
    button: ButtonContent[]
    map: MapContent[]
    backgroundColor: BackgroundColor
}>

export type PillOptionContent = BlockContent<{
    component: 'pill_option'
    label: string
    value?: string
    active?: boolean
}>

export type ContactSectionContent = BlockContent<{
    component: 'contact_section'
    title?: string
    description?: RichTextContent
    subjects: PillOptionContent[]
    button: ButtonContent[]
    placeholders?: string
    backgroundColor: BackgroundColor
}>
