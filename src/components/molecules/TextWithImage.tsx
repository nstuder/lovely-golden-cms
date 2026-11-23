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
export const TextWithImage = ({ content, image, right }: Props) => {
    const text = (
        <div className="col-md-6 my-auto">
            <RichText content={content} />
        </div>
    )
    const img = (
        <div className="col-md-6 py-2 my-auto">
            <Image image={image} className="shadow mx-auto" />
        </div>
    )
    return (
        <div className="row">
            {right ? (
                <>
                    {text}
                    {img}
                </>
            ) : (
                <>
                    {img}
                    {text}
                </>
            )}
        </div>
    )
}
