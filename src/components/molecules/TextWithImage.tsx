import type { Media } from '@/cms/payload-types'
import { Image } from '@/components/atoms'
import { RichText } from './RichText'

type Props = {
    content: unknown
    image?: Media | string | null
    /** image on the right side (default: left) */
    right?: boolean | null
}

/** Rich text next to an image ("text-with-image" block). */
export const TextWithImage = ({ content, image, right }: Props) => (
    <div className="grid items-center gap-6 md:grid-cols-2">
        <div className={right ? 'md:order-2' : undefined}>
            <Image
                image={image}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="mx-auto rounded-lg shadow-lg"
            />
        </div>
        <RichText content={content} />
    </div>
)
