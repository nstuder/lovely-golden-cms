import type { Media } from '@/cms/payload-types'
import { ResponsiveImage } from '@/components/atoms'
import { PedigreeTable, type PedigreeParent } from '@/components/molecules'

type Father = PedigreeParent & { fatherImage?: Media | string | null }
type Mother = PedigreeParent & { motherImage?: Media | string | null }

type Props = {
    father?: Father | null
    mother?: Mother | null
}

/** Pedigree table with parent images (pedigree.hbs). */
export const Pedigree = ({ father, mother }: Props) => (
    <div className="row align-items-center">
        <div className="col-md-4">
            <ResponsiveImage image={father?.fatherImage} />
            <p className="fs-5 text-center">{father?.name}</p>
            <br />
            <ResponsiveImage image={mother?.motherImage} />
            <p className="fs-5 text-center">{mother?.name}</p>
        </div>
        <div className="table-responsive col-md-8">
            <PedigreeTable father={father} mother={mother} />
        </div>
    </div>
)
