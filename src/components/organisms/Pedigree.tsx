import type { Media } from '@/cms/payload-types'
import { ResponsiveImage } from '@/components/atoms'
import { PedigreeTable, type PedigreeParent } from '@/components/molecules'

type Father = PedigreeParent & { fatherImage?: Media | string | null }
type Mother = PedigreeParent & { motherImage?: Media | string | null }

type Props = {
    father?: Father | null
    mother?: Mother | null
}

// 75% of the md:col-span-4 column
const SIZES = '(min-width: 768px) 25vw, 100vw'

const Parent = ({
    image,
    name,
}: {
    image?: Media | string | null
    name?: string | null
}) => (
    <figure>
        <ResponsiveImage image={image} sizes={SIZES} />
        <figcaption className="mt-2 text-center text-xl font-semibold">
            {name}
        </figcaption>
    </figure>
)

/** Pedigree table with parent images (pedigree.hbs). */
export const Pedigree = ({ father, mother }: Props) => (
    <div className="my-6 grid items-center gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-8 md:col-span-4">
            <Parent image={father?.fatherImage} name={father?.name} />
            <Parent image={mother?.motherImage} name={mother?.name} />
        </div>
        <div className="overflow-x-auto md:col-span-8">
            <PedigreeTable father={father} mother={mother} />
        </div>
    </div>
)
