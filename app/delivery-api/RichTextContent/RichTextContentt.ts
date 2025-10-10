import type { BlockContent } from '~/delivery-api'
import type { Mark } from './Mark'

/**
 * Rich text content consists of ProseMirror nodes
 */
export type RichTextContentt =
    | DocNode
    | ParagraphNode
    | TextNode
    | HorizontalRuleNode
    | BlockQuoteNode
    | BulletListNode
    | OrderedListNode
    | HeadingNode
    | BlockNode
    | CodeBlockNode
    | ImageNode

/*
 * Nodes
 */

export type DocNode = {
    type: 'doc'
    content: RichTextContentt[]
}

export type ParagraphNode = {
    type: 'paragraph'
    content: RichTextContentt[]
}

export type TextNode = {
    type: 'text'
    text: string
    marks?: Mark[]
}

export type HorizontalRuleNode = {
    type: 'horizontal_rule'
}

export type BlockQuoteNode = {
    type: 'blockquote'
    content: RichTextContentt[]
}

export type ListItemNode = {
    type: 'list_item'
    content: RichTextContentt[]
}

export type BulletListNode = {
    type: 'bullet_list'
    content: ListItemNode[]
}

export type OrderedListNode = {
    type: 'ordered_list'
    content: ListItemNode[]
}

export type HeadingNode = {
    type: 'heading'
    attrs: {
        level: 1 | 2 | 3 | 4 | 5 | 6
    }
    content: RichTextContentt[]
}

export type BlockNode = {
    type: 'blok'
    attrs: {
        // Actually a UUID—not an ID
        id: string
        body: BlockContent[]
    }
}

export type CodeBlockNode = {
    type: 'code_block'
    content: RichTextContentt[]
}

export type ImageNode = {
    type: 'image'
    attrs: ImageAttrs
}

export type ImageAttrs = {
    id: number
    alt: string
    src: string
    title: string
    source: string
    copyright: string
}
