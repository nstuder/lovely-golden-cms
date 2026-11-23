import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', crawlDelay: 5 },
        sitemap: `${process.env.BASE_URL}/sitemap.xml`,
    }
}
