import type {ISbStoryData} from '@storyblok/js'
import type {ContactFormPayload} from '~~/server/types/mail/contact'
import type {LinkContent as TLinkContent} from '~/delivery-api'
import type {StoryResponse, StoryblokStory} from '~/services/types/storyblok'
import Handlebars from 'handlebars'
import {DateTime} from 'luxon'
import {StoryblokService} from '~/services/storyblokService'
import {websiteLogoUrl, websiteName} from '~~/server/services/mail/mail.config'
import {registerHandlebarsHelpers} from '~~/server/helpers/HandlebarsHelpers'

/** Storyblok enum mapped to hex CSS for email-safe backgrounds. */
const BG_HEX: Record<string, string> = {
    beige: '#f4f2e9',
    white: '#FFFFFF',
    grey: '#f5f5f7',
    purple: '#EAE9F4',
    orange: '#FFE7D3',
    yellow: '#F2C97B',
    'light-yellow': '#FFF0D3',
    green: '#EFF4E9',
    pink: '#FECCD4',
    blue: '#D9E6F6',
}

/** Strict content model for the email_contact_template blok. */
export interface EmailContactTemplateBlok {
    component: 'email-contact'
    subject: string
    title: string
    backgroundColor: keyof typeof BG_HEX
    body: EmailContactTemplateBlok[]
    footer?: string
    ctaLabel?: string
    ctaLink?: TLinkContent
}

/** Story typed with our blok. */
export type EmailContactStory = Omit<ISbStoryData, 'content'> & {
    content: EmailContactTemplateBlok
}

/** Variables injected into templates. */
export interface EmailVars extends ContactFormPayload {
    siteName: string
    dateISO: string
    dateLocal: string
    logoUrl: string,
}

/** Final rendered email (subject + html + text). */
export interface RenderedEmail {
    subject: string
    html: string
    text: string
}

/**
 * Service to fetch an email_contact_template story from Storyblok
 * and render it into email-safe HTML using inline styles.
 */
export class EmailContactTemplateService {
    /**
     * Fetches a story by slug. Uses `draft` when _storyblok is present,
     * otherwise `published` (typical server-side usage: published in prod).
     */
    public static async fetchBySlug(
        slug: string,
        version: 'draft' | 'published' = process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    ): Promise<EmailContactStory> {
        const storyResponse: StoryResponse<EmailContactStory> =
            await StoryblokService.getStoryBySlug<EmailContactStory>(slug, version)

        const story: EmailContactStory = storyResponse.story as unknown as EmailContactStory

        if (!story?.content || story.full_slug !== slug) {
            throw new Error(`Story "${slug}" is not an ${slug}`)
        }
        return story
    }

    /**
     * Builds the injection variables from the form payload.
     */
    public static buildVars(payload: ContactFormPayload, siteName = websiteName, logoUrl = websiteLogoUrl): EmailVars {
        const now = new Date()
        return {
            ...payload,
            siteName,
            logoUrl,
            dateISO: now.toISOString(),
            dateLocal: DateTime.fromJSDate(now).setZone('Europe/Paris').toFormat('dd/MM/yyyy HH:mm'),
        }
    }

    /**
     * Renders the email (subject/html/text) using Handlebars.
     * The HTML uses a minimal table layout with inline styles (email-safe).
     */
    public static render(story: EmailContactStory, vars: EmailVars): RenderedEmail {
        // Ensure helpers are registered once per process
        registerHandlebarsHelpers()

        const blok: EmailContactTemplateBlok = story.content.body[0]
        const bg: string = BG_HEX[blok.backgroundColor] ?? '#FFFFFF'

        if(!vars.name) {
            // replace in title 'de {{name}}' with 'du {{phone}}'
            if(vars.phone) {
                blok.title = blok.title.replace('de {{name}}', 'du {{phone}}')
            }
        }

        // 1) Subject (templated)
        const subject: string = Handlebars.compile(blok.subject)(vars)

        // 2) Body pieces (templated with escaping by default; allow {{{ }}} in content if needed)
        const titleHtml: string = Handlebars.compile(blok.title)(vars)
        const bodyHtml: string = Handlebars.compile(blok.body)(vars)
        const footerHtml: string = blok.footer ? Handlebars.compile(blok.footer)(vars) : ''
        const ctaLabel: string = blok.ctaLabel ? Handlebars.compile(blok.ctaLabel)(vars) : ''

        const ctaHref: string | null = this.resolveHref(blok.ctaLink)

        // 3) Compose final HTML (600px centered container, inline styles)
        const html: string = this.composeHtml({
            bg,
            titleHtml,
            bodyHtml,
            footerHtml,
            ctaLabel,
            ctaHref,
            siteName: vars.siteName,
            logoUrl: vars.logoUrl,
        })

        // 4) Plain text alternative
        const text: string = [
            `${vars.siteName}`,
            '---',
            titleHtml.replace(/<[^>]+>/g, ''),
            '',
            bodyHtml
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<\/p>/gi, '\n')
                .replace(/<[^>]+>/g, ''),
            '',
            footerHtml.replace(/<[^>]+>/g, ''),
            '',
            `Sent: ${vars.dateLocal} (${vars.dateISO})`,
        ]
            .join('\n')
            .replace(/\n{3,}/g, '\n\n')

        return {subject, html, text}
    }

    /** Safely resolves a Storyblok link to an absolute/relative URL or mailto:. */
    private static resolveHref(link?: TLinkContent): string | null {
        if (!link) return null
        switch (link.linktype) {
            case 'email':
                return link.email ? `mailto:${link.email.trim()}` : null
            case 'url':
            case 'asset':
                return (link.cached_url || '').trim() || null
            case 'story': {
                const p = (link.cached_url || '').trim()
                return p ? `/${p.replace(/^\//, '')}` : null
            }
            default:
                return null
        }
    }

    /** Compose an email-safe HTML document with inline styles (clean UI + logo + border-only CTA). */
    private static composeHtml(input: {
        bg: string
        titleHtml: string
        bodyHtml: string
        footerHtml: string
        ctaLabel?: string
        ctaHref?: string | null
        siteName: string
        logoUrl?: string
    }): string {
        const {
            bg, titleHtml, bodyHtml, footerHtml, ctaLabel, ctaHref,
            siteName, logoUrl
        } = input

        const buttonHtml =
            ctaLabel && ctaHref
                ? `<tr>
  <td align="left" style="padding-top:12px;">
    <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${ctaHref}"
      style="height:44px;v-text-anchor:middle;width:260px;" arcsize="10%"
      fillcolor="#004AAD" strokecolor="#004AAD">
      <w:anchorlock/>
      <center style="color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;">
        ${ctaLabel}
      </center>
    </v:roundrect>
    <![endif]-->

    <!--[if !mso]><!-- -->
    <a href="${ctaHref}"
       style="display:inline-block;padding:14px 24px;
              background:#004AAD;border:1px solid #004AAD;border-radius:8px;
              color:#FFFFFF;text-decoration:none;font-weight:600;
              font-size:14px;line-height:1;">
      ${ctaLabel}
    </a>
    <!--<![endif]-->
  </td>
</tr>
`
                : ''

        const headerHtml = logoUrl
            ? `<img src="${logoUrl}" width="${110}" alt="${escapeHtmlText(siteName)}" 
             style="display:block;border:0;outline:none;text-decoration:none;height:auto;max-width:100%;border-radius: 100%; margin-bottom: 24px;">`
            : `<div style="font-size:16px;font-weight:700;color:#0F172A;">${escapeHtmlText(siteName)}</div>`

        return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtmlText(siteName)}</title>
</head>
<body style="margin:0;padding:0;background:${bg};-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${bg};padding:48px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="width:640px;max-width:640px;font-family:Arial,Helvetica,sans-serif;color:#0F172A;">
          <!-- Header with logo -->
          <tr><td style="padding:0 0 8px 0;">${headerHtml}</td></tr>

          <!-- Accent bar -->
          <tr>
            <td>
              <div style="height:4px;width:128px;border-radius:9999px;background:linear-gradient(90deg,#E11D48 0%,#F59E0B 100%);"></div>
            </td>
          </tr>

          <!-- Spacing -->
          <tr><td style="height:32px;line-height:32px;">&nbsp;</td></tr>

          <!-- Title -->
          <tr>
            <td style="font-size:22px;font-weight:600;letter-spacing:0.1px;color:#0F172A;padding:0 0 24px 0;">
              ${titleHtml}
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="font-size:15px;line-height:28px;color:#1F2937;">
              ${bodyHtml}
            </td>
          </tr>

          ${buttonHtml}

          <!-- Footer -->
          ${
            footerHtml
                ? `<tr><td style="padding-top:40px;border-top:1px solid #E2E8F0;"></td></tr>
                 <tr>
                   <td style="padding-top:16px;font-size:13px;line-height:22px;color:#374151;font-weight:600;">
                     ${footerHtml}
                   </td>
                 </tr>`
                : ''
        }
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    }
}

/** Escape minimal for text nodes in <title> etc. */
function escapeHtmlText(s: string): string {
    return s
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
}
