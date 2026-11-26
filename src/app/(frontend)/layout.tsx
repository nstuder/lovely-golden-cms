import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { BootstrapClient } from '@/components/behaviors/BootstrapClient'
import { SiteTemplate } from '@/components/templates'
import { escapeJsonForScript } from '@/lib/format'
import { buildMetadata } from '@/lib/metadata'
import { getLayoutGlobals, getSeo } from '@/lib/payload'
// compiled by Next.js: hashed file name, cached by browsers for a year
import '@/styles/main.scss'

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
                {seo.structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: escapeJsonForScript(seo.structuredData),
                        }}
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
