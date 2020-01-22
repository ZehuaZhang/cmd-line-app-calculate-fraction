import { isString } from './object.util'

export function getTrimmedString(text: string) {
    if (!text || !isString(text)) {
        return ''
    }

    return text.trim()
}