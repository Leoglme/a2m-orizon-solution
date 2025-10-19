import type { EmailContactStory, EmailVars, RenderedEmail } from '~~/server/services/mail/storyblok/EmailContactTemplateService'
import type { ContactFormPayload } from '~~/server/types/mail/contact'
import { websiteName } from '~~/server/services/mail/mail.config'
import { sendMail } from '~~/server/services/mail/sendMail'
import { EmailContactTemplateService } from '~~/server/services/mail/storyblok/EmailContactTemplateService'

/**
 * Sends an acknowledgement email to the user.
 * Fetches Storyblok story "emails/email-contact-acknowledgement" and renders it with variables.
 */
export async function sendContactAcknowledgementMail(payload: ContactFormPayload): Promise<void> {
    const story: EmailContactStory = await EmailContactTemplateService.fetchBySlug('emails/email-contact-acknowledgement')
    const vars: EmailVars = EmailContactTemplateService.buildVars(payload, websiteName)
    const rendered: RenderedEmail = EmailContactTemplateService.render(story, vars)

    await sendMail({
        toEmail: payload.email,
        toName: payload.name,
        subject: rendered.subject || `Accusé de réception – ${vars.siteName}`,
        htmlContent: rendered.html,
    })
}
