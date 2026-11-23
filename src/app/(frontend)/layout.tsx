import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { BootstrapClient } from '@/components/behaviors/BootstrapClient'
import { SiteTemplate } from '@/components/templates'
import { buildMetadata } from '@/lib/metadata'
import { getLayoutGlobals, getSeo } from '@/lib/payload'

// Content comes from the CMS on every request (like the Express version);
// this also keeps `next build` independent of the database.
export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#996699CC',
}

export const generateMetadata = async (): Promise<Metadata> => ({
    metadataBase: process.env.BASE_URL
        ? new URL(process.env.BASE_URL)
        : undefined,
    ...(await buildMetadata()),
})

export default async function FrontendLayout({
    children,
}: {
    children: ReactNode
}) {
    const [{ navigation, configuration }, seo] = await Promise.all([
        getLayoutGlobals(),
        getSeo(),
    ])

    return (
        <html lang="de">
            <head>
                <link
                    media="all"
                    rel="stylesheet"
                    href="/assets/styles/main.css"
                />
                {seo.structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: seo.structuredData }}
                    />
                )}
            </head>
            <body>
                <SiteTemplate
                    navigation={navigation}
                    configuration={configuration}
                >
                    {children}
                </SiteTemplate>
                <BootstrapClient />
            </body>
        </html>
    )
}
