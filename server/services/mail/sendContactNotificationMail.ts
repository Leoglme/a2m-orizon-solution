import type { EmailContactStory, EmailVars, RenderedEmail } from '~~/server/services/mail/storyblok/EmailContactTemplateService'
import type { ContactFormPayload } from '~~/server/types/mail/contact'
import { ownerEmail, websiteName } from '~~/server/services/mail/mail.config'
import { sendMail } from '~~/server/services/mail/sendMail'
import { EmailContactTemplateService } from '~~/server/services/mail/storyblok/EmailContactTemplateService'

/**
 * Sends the contact notification email to the site owner.
 * Fetches Storyblok story "emails/email-contact" and renders it with variables.
 */
export async function sendContactNotificationMail(payload: ContactFormPayload): Promise<void> {
    // 1) Fetch story
    const story: EmailContactStory = await EmailContactTemplateService.fetchBySlug('emails/email-contact')

    // 2) Build variables
    const vars: EmailVars = EmailContactTemplateService.buildVars(payload, websiteName)

    // 3) Render
    const rendered: RenderedEmail = EmailContactTemplateService.render(story, vars)

    // 4) Send
    await sendMail({
        toEmail: ownerEmail,
        toName: websiteName,
        subject: rendered.subject || `Nouveau contact – ${vars.name}`,
        htmlContent: rendered.html,
    })
}
