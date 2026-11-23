import type {
    Configuration,
    Navigation as NavigationType,
} from '@/cms/payload-types'
import { HeaderCarousel } from './HeaderCarousel'
import { Navigation } from './Navigation'

type Props = {
    navigation: NavigationType
    configuration: Configuration
}

/** Navigation + header carousel (partials/header.hbs). */
export const Header = ({ navigation, configuration }: Props) => (
    <>
        <Navigation items={navigation.items} />
        <HeaderCarousel images={configuration.images} />
    </>
)
