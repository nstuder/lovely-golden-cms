import type { Page } from '@/cms/payload-types'
import { Image } from './Image'

type PedigreeBlock = Extract<
    NonNullable<Page['content']>[number],
    { blockType: 'pedigree' }
>

type Props = {
    father?: Partial<PedigreeBlock['father']> | null
    mother?: Partial<PedigreeBlock['mother']> | null
}

type Parent = NonNullable<Props['father']> | NonNullable<Props['mother']>

const ParentRows = ({ parent }: { parent?: Parent | null }) => (
    <>
        <tr>
            <td className="align-middle" rowSpan={4}>
                {parent?.name}
            </td>
            <td className="align-middle" rowSpan={2}>
                {parent?.grandfather?.name}
            </td>
            <td>{parent?.grandfather?.greatGrandparents?.father}</td>
        </tr>
        <tr>
            <td>{parent?.grandfather?.greatGrandparents?.mother}</td>
        </tr>
        <tr>
            <td className="align-middle" rowSpan={2}>
                {parent?.grandmother?.name}
            </td>
            <td>{parent?.grandmother?.greatGrandparents?.father}</td>
        </tr>
        <tr>
            <td>{parent?.grandmother?.greatGrandparents?.mother}</td>
        </tr>
    </>
)

/** Pedigree table with parent images (pedigree.hbs). */
export const Pedigree = ({ father, mother }: Props) => (
    <div className="row align-items-center">
        <div className="col-md-4">
            <Image
                image={father?.fatherImage}
                className="shadow mx-auto d-none d-md-block w-75"
            />
            <Image
                image={father?.fatherImage}
                className="shadow mx-auto d-block d-md-none w-100"
            />
            <p className="fs-5 text-center">{father?.name}</p>
            <br />
            <Image
                image={mother?.motherImage}
                className="shadow mx-auto d-none d-md-block w-75"
            />
            <Image
                image={mother?.motherImage}
                className="shadow mx-auto d-block d-md-none w-100"
            />
            <p className="fs-5 text-center">{mother?.name}</p>
        </div>
        <div className="table-responsive col-md-8">
            <table className="table table-striped table-bordered border-primary text-center">
                <thead>
                    <tr>
                        <th>Vater</th>
                        <th>Großeltern</th>
                        <th>Urgroßeltern</th>
                    </tr>
                </thead>
                <tbody>
                    <ParentRows parent={father} />
                </tbody>
                <thead>
                    <tr>
                        <th>Mutter</th>
                        <th>Großeltern</th>
                        <th>Urgroßeltern</th>
                    </tr>
                </thead>
                <tbody>
                    <ParentRows parent={mother} />
                </tbody>
            </table>
        </div>
    </div>
)
