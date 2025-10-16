import type {
    BlockContent,
    LinkContent as TLinkContent,
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
    | ContactItemContent
    | ContactSectionContent
    | PillOptionContent
    | LinkContent
    | DropdownContent
    | NavbarContent
    | FooterContent
    | FooterMenuContent
    | FooterMenuItemContent

export type BackgroundColor =
    | 'beige'
    | 'white'
    | 'grey'
    | 'purple'
    | 'orange'
    | 'yellow'
    | 'light-yellow'
    | 'green'
    | 'pink'
    | 'blue'

export type HeroContent = BlockContent<{
    component: 'hero'
    image?: AssetContent
    imagePadding: boolean
    layoutPosition: 'left' | 'right' | 'center'
    sectionId?: string
    description: RichTextContent
    backgroundColor: BackgroundColor
    buttons: ButtonContent[]
}>

export type ButtonContent = BlockContent<{
    component: 'button'
    text: string
    link?: TLinkContent
    color: 'primary' | 'secondary'
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}>

export type PageContent = BlockContent<{
    component: 'page'
    body: Content[]
}>

export type CardContent = BlockContent<{
    component: 'card'
    description: RichTextContent
    icon?: AssetContent
    button?: ButtonContent[]
    link?: TLinkContent
}>

export type CardsContent = BlockContent<{
    component: 'cards'
    sectionId?: string
    description: RichTextContent
    cards: CardContent[]
    button?: ButtonContent[]
    backgroundColor: BackgroundColor
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

export type ContantItemContentIconType = 'map-pin' | 'mail' | 'phone'

export type ContactItemContent = BlockContent<{
    component: 'contact_item'
    icon: ContantItemContentIconType
    text: string
    link?: TLinkContent
}>

export type MapSectionContent = BlockContent<{
    component: 'map_section'
    layout: 'description' | 'contacts'
    title?: string
    description?: RichTextContent
    contacts?: ContactItemContent[]
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
    sectionId?: string
    title?: string
    description?: RichTextContent
    subjects: PillOptionContent[]
    button: ButtonContent[]
    placeholders?: string
    backgroundColor: BackgroundColor
}>

export type LinkContent = BlockContent<{
    component: 'link'
    label: string
    link: TLinkContent
    activeColor?: string
}>

export type DropdownContent = BlockContent<{
    component: 'dropdown'
    label: string
    items: LinkContent[]
}>

export type NavbarContent = BlockContent<{
    component: 'navbar'
    items: Array<LinkContent | ButtonContent | DropdownContent>
    sticky?: boolean
    backdrop?: boolean
}>

export type FooterMenuItemContent = BlockContent<{
    component: 'footer_menu_item'
    label: string
    link?: TLinkContent
}>

export type FooterMenuContent = BlockContent<{
    component: 'footer_menu'
    title?: string
    items: FooterMenuItemContent[]
}>

export type FooterContent = BlockContent<{
    component: 'footer'
    title?: string
    description?: RichTextContent
    linkedInUrl?: string
    phoneNumber?: string
    email?: string
    menus?: FooterMenuContent[]
}>
