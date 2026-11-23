// @vitest-environment node
import { describe, expect, it } from 'vitest'
import robots from './robots'

describe('robots', () => {
    it('allows everything with crawl delay and links the sitemap', () => {
        expect(robots()).toEqual({
            rules: { userAgent: '*', crawlDelay: 5 },
            sitemap: 'https://www.example.com/sitemap.xml',
        })
    })
})
