import type { H3Event } from 'h3'
import type { ContactFormPayload } from '~~/server/types/mail/contact'
import { createError } from 'h3'
import { sendContactAcknowledgementMail } from '~~/server/services/mail/sendContactAcknowledgementMail'
import { sendContactNotificationMail } from '~~/server/services/mail/sendContactNotificationMail'

/**
 * Handles POST requests for contact form submission.
 * Validates payload, sends the owner notification and user acknowledgement emails.
 */
export default defineEventHandler(async (event: H3Event) => {
    if (event.method !== 'POST') {
        throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed. Please use POST.' })
    }

    const body: ContactFormPayload = await readBody(event)

    // Strict required fields
    if (!body?.subject || !body?.message) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload: subject and message are required.',
        })
    }

    // Basic email regex
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (body.email && !emailRegex.test(body.email)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid email format.' })
    }

    try {
        await sendContactNotificationMail({
            subject: body.subject.trim(),
            name: body.name?.trim(),
            email: body.email?.trim(),
            message: body.message.trim(),
        })
        if(body.email) {
            await sendContactAcknowledgementMail({
                subject: body.subject.trim(),
                name: body.name?.trim(),
                email: body.email.trim(),
                message: body.message.trim(),
            })
        }
        return { message: 'Contact emails sent successfully.' }
    } catch (error) {
        console.error('contact.post: Error sending contact emails:', error)
        throw createError({ statusCode: 500, statusMessage: 'Failed to send contact email.' })
    }
})
