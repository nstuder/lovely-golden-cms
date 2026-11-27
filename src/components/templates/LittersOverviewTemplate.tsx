import type { Litter } from '@/cms/payload-types'
import { TeaserCard } from '@/components/molecules'

type LitterTeaser = Pick<Litter, 'id' | 'name' | 'slug' | 'collage'>

/** /wuerfe: all litters. */
export const LittersOverviewTemplate = ({
    litters,
}: {
    litters: LitterTeaser[]
}) => (
    <section className="container-page">
        <h1>Würfe</h1>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {litters.map((litter) => (
                <div key={litter.id} className="w-full md:w-[calc(50%-1rem)]">
                    <TeaserCard
                        href={litter.slug}
                        title={litter.name}
                        image={litter.collage}
                    />
                </div>
            ))}
        </div>
    </section>
)
