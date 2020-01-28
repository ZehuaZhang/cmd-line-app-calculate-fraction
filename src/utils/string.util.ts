import { isString } from './object.util'

export function getTrimmedString(text: string) {
    if (!text || !isString(text)) {
        return ''
    }

    return text.trim()
}

export function isStringWithSpaces(text: string) {
    return !getTrimmedString(text)
}