import type { Dog } from '@/cms/payload-types'
import { TeaserCard } from '@/components/molecules'

type DogTeaser = Pick<Dog, 'id' | 'name' | 'slug' | 'type' | 'teaserImage'>

export const DOG_CATEGORIES: { type: Dog['type']; title: string }[] = [
    { type: 'rzucht', title: 'Zuchtrüden' },
    { type: 'fzucht', title: 'Zuchthündinnen' },
    { type: 'young', title: 'Youngster' },
    { type: 'retirement', title: 'Im Ruhestand' },
    { type: 'dead', title: 'In Memoriam' },
]

/** /hunde: dogs grouped by category, empty categories are hidden. */
export const DogsOverviewTemplate = ({ dogs }: { dogs: DogTeaser[] }) => (
    <section className="container">
        <h1>Unsere Hunde</h1>
        <div className="row text-center justify-content-center">
            {DOG_CATEGORIES.map(({ type, title }) => {
                const inCategory = dogs.filter((dog) => dog.type === type)
                if (!inCategory.length) return null
                return [
                    <h2 className="col-12 mt-5" key={type}>
                        {title}
                    </h2>,
                    ...inCategory.map((dog) => (
                        <TeaserCard
                            key={dog.id}
                            href={dog.slug}
                            title={dog.name}
                            image={dog.teaserImage}
                        />
                    )),
                ]
            })}
        </div>
    </section>
)
