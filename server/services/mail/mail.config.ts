import path from 'node:path'
import Mailjet from 'node-mailjet'
import type { SendEmailV3_1 } from 'node-mailjet'
import * as dotenv from 'dotenv'
import { useRuntimeConfig } from '#imports'

const envPath: string = path.resolve(process.cwd(), '.env')
dotenv.config({ path: envPath })

const config = useRuntimeConfig()

if (!config.mailjetApiKey || !config.mailjetApiSecret) {
    throw new Error('Mailjet API_KEY and API_SECRET are required in runtime config or .env')
}

export const mailjet: Mailjet = Mailjet.apiConnect(config.mailjetApiKey, config.mailjetApiSecret)

/**
 * Type for Mailjet sends parameters.
 */
export type MailjetSendParams = SendEmailV3_1.Body

/**
 * Constants for domain
 */
export const domain: string = 'a2m-orizon-solutionsocial.fr'
export const websiteName: string = 'A2M ÔRIZON SOLUTION'
export const websiteLogoUrl: string = `https://${domain}/A2M-ÔRIZON-SOLUTION-LOGO.png`
/**
 * Constants for email configuration.
 */
export const ownerEmail: string = `contact@${domain}`
export const receiverEmailDev: string = `contact@${domain}`
