import type { Litter } from '@/cms/payload-types'
import { TeaserCard } from '@/components/molecules'

type LitterTeaser = Pick<Litter, 'id' | 'name' | 'slug' | 'collage'>

/** /wuerfe: all litters. */
export const LittersOverviewTemplate = ({
    litters,
}: {
    litters: LitterTeaser[]
}) => (
    <section className="container">
        <h1>Würfe</h1>
        <div className="row text-center justify-content-center">
            {litters.map((litter) => (
                <TeaserCard
                    key={litter.id}
                    href={litter.slug}
                    title={litter.name}
                    image={litter.collage}
                />
            ))}
        </div>
    </section>
)
