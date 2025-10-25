export type ContactFormPayload = {
    subject: string
    name?: string
    email?: string
    message: string
    phone?: string
}

export type RestrictedContactFormPayload = {
    subject: string
    name?: string
    email: string
    message: string
    phone?: string
}
