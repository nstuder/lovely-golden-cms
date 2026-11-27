import type { ReactNode } from 'react'
import type { Configuration, Navigation } from '@/cms/payload-types'
import { Footer, Header } from '@/components/organisms'

type Props = {
    navigation: Navigation
    configuration: Configuration
    children: ReactNode
}

/** Frame of every page: navigation + header carousel, content, footer. */
export const SiteTemplate = ({
    navigation,
    configuration,
    children,
}: Props) => (
    <>
        <Header navigation={navigation} configuration={configuration} />
        <main id="inhalt" className="my-6">
            {children}
        </main>
        <Footer configuration={configuration} />
    </>
)
