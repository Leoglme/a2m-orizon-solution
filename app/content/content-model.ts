import type {
    BlockContent,
    LinkContent as TLinkContent,
    AssetContent,
    RichTextContent,
} from '~/delivery-api'
import type { GsapAnimationType, GsapEase } from '~/services/types/gsap'

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
    | EmailContactTemplateContent
    | BlogArticleContent
    | BlogListContent
    | ImageBlockContent
    | TextBlockContent

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


export type AnimationSettingsContent = BlockContent<{
    component: 'AnimationSettings'
    enabled: boolean
    type: GsapAnimationType
    duration?: number
    delay?: number
    easing?: GsapEase
    stagger?: number
    parallaxIntensity?: number
}>

export type HeroContent = BlockContent<{
    component: 'hero'
    image?: AssetContent
    imagePadding: boolean
    layoutPosition: 'left' | 'right' | 'center'
    sectionId?: string
    description: RichTextContent
    backgroundColor: BackgroundColor
    buttons: ButtonContent[]
    textAnimation?: AnimationSettingsContent[]
    imageAnimation?: AnimationSettingsContent[]
}>

export type ButtonContent = BlockContent<{
    component: 'button'
    text: string
    link?: TLinkContent
    color: 'primary' | 'secondary'
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    animation?: AnimationSettingsContent[]
}>

export type PageContent = BlockContent<{
    component: 'page'
    seo_title?: string
    seo_description?: string
    body: Content[]
}>

export type CardContent = BlockContent<{
    component: 'card'
    description: RichTextContent
    icon?: AssetContent
    button?: ButtonContent[]
    link?: TLinkContent
    animation?: AnimationSettingsContent[]
}>

export type CardsContent = BlockContent<{
    component: 'cards'
    sectionId?: string
    description: RichTextContent
    cards: CardContent[]
    button?: ButtonContent[]
    backgroundColor: BackgroundColor
    descriptionAnimation?: AnimationSettingsContent[]
}>

export type TabContent = BlockContent<{
    component: 'tab'
    title: string
    content: Content[]
}>

export type TabsContent = BlockContent<{
    component: 'tabs'
    title?: string
    description: RichTextContent
    descriptionAnimation?: AnimationSettingsContent[]
    titleAnimation?: AnimationSettingsContent[]
    contentPanelAnimation?: AnimationSettingsContent[]
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
    titleAnimation?: AnimationSettingsContent[]
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
    titleAnimation?: AnimationSettingsContent[]
    contentAnimation?: AnimationSettingsContent[]
    mapAnimation?: AnimationSettingsContent[]
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
    placeholders?: string
    backgroundColor: BackgroundColor
    titleAnimation?: AnimationSettingsContent[]
}>

export type LinkContent = BlockContent<{
    component: 'SbLink'
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


export type EmailContactTemplateContent = BlockContent<{
    component: 'email_contact_template'
    subject: string
    title: string
    backgroundColor: BackgroundColor
    body: string
    footer?: string
    ctaLabel?: string
    ctaLink?: TLinkContent
}>

export type BlogArticleContent = BlockContent<{
    component: 'blog_article'
    title: string
    description: string
    category?: string
    coverImage?: AssetContent
    author?: string
    body: RichTextContent
}>

export type BlogListContent = BlockContent<{
    component: 'blog_list'
    introBackgroundColor: BackgroundColor
    intro?: RichTextContent
    perPage?: number
    showCategory?: boolean
    seo_title?: string
    seo_description?: string
}>


export type ImageBlockContent = BlockContent<{
    component: 'image_block'
    image: AssetContent
    align: 'left' | 'center' | 'right'
    maxWidth?: number
    animation?: AnimationSettingsContent[]
}>


export type TextBlockContent = BlockContent<{
    component: 'text_block'
    text: RichTextContent
}>
