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
    <section className="container-page">
        <h1>Unsere Hunde</h1>
        {DOG_CATEGORIES.map(({ type, title }) => {
            const inCategory = dogs.filter((dog) => dog.type === type)
            if (!inCategory.length) return null
            return (
                <section key={type} className="mt-12">
                    <h2>{title}</h2>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                        {inCategory.map((dog) => (
                            <div
                                key={dog.id}
                                className="w-full md:w-[calc(50%-1rem)]"
                            >
                                <TeaserCard
                                    href={dog.slug}
                                    title={dog.name}
                                    image={dog.teaserImage}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )
        })}
    </section>
)
