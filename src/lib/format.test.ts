import { describe, expect, it } from 'vitest'
import { escapeJsonForScript, toLocalDate } from './format'

describe('toLocalDate', () => {
    it('formats as German date', () => {
        expect(toLocalDate('2024-03-05T10:00:00.000Z')).toBe('5.3.2024')
    })

    it('uses the Berlin time zone (late UTC evening is the next day)', () => {
        expect(toLocalDate('2024-03-05T23:30:00.000Z')).toBe('6.3.2024')
    })

    it('returns an empty string without a date', () => {
        expect(toLocalDate(null)).toBe('')
        expect(toLocalDate(undefined)).toBe('')
        expect(toLocalDate('')).toBe('')
    })
})

describe('escapeJsonForScript', () => {
    it('cannot close the script tag and stays the same JSON', () => {
        const json = JSON.stringify({
            name: '</script><script>alert(1)</script>',
        })
        const escaped = escapeJsonForScript(json)
        expect(escaped).not.toContain('</script>')
        expect(JSON.parse(escaped)).toEqual(JSON.parse(json))
    })
})
