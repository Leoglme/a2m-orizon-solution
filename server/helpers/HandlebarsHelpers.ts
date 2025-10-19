import Handlebars from 'handlebars'

export function registerHandlebarsHelpers(): void {
    Handlebars.registerHelper('debug', function (context) {
        return JSON.stringify(context, null, 2)
    })

    Handlebars.registerHelper('interpolate', (templateString: string, context) => {
        return templateString.replace(/\${{(.*?)}}/g, (_, varName) => {
            const value = (context as Record<string, unknown>)[String(varName).trim()]
            return value !== undefined ? String(value) : `\${{${varName}}}`
        })
    })

    Handlebars.registerHelper('nl2br', (text: unknown) => {
        const safe = Handlebars.escapeExpression(String(text ?? ''))
        return new Handlebars.SafeString(safe.replace(/\r?\n/g, '<br/>'))
    })
}
