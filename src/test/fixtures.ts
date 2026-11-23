import type { Dog, Litter, Media } from '@/cms/payload-types'

/** Populated upload document. */
export const media = (name: string, overrides: Partial<Media> = {}): Media => ({
    id: `media-${name}`,
    alt: `Alt ${name}`,
    url: `/api/media/file/${name}.jpg`,
    width: 1200,
    height: 800,
    sizes: {
        small: {
            url: `/api/media/file/${name}-small.jpg`,
            width: 400,
            height: 267,
        },
        medium: {
            url: `/api/media/file/${name}-medium.jpg`,
            width: 800,
            height: 533,
        },
    },
    updatedAt: '2024-01-01T00:00:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
})

/** Slate paragraph with plain text. */
export const paragraph = (text: string) => ({ children: [{ text }] })

export const pedigreeParents = {
    father: {
        name: 'Vater Hund',
        fatherImage: media('father'),
        grandfather: {
            name: 'Opa V',
            greatGrandparents: { father: 'Uropa VV', mother: 'Uroma VV' },
        },
        grandmother: {
            name: 'Oma V',
            greatGrandparents: { father: 'Uropa VM', mother: 'Uroma VM' },
        },
    },
    mother: {
        name: 'Mutter Hund',
        motherImage: media('mother'),
        grandfather: {
            name: 'Opa M',
            greatGrandparents: { father: 'Uropa MV', mother: 'Uroma MV' },
        },
        grandmother: {
            name: 'Oma M',
            greatGrandparents: { father: 'Uropa MM', mother: 'Uroma MM' },
        },
    },
}

export const dog = (overrides: Partial<Dog> = {}): Dog =>
    ({
        id: 'dog-1',
        name: 'Summer',
        breedingName: 'Summer of Love',
        slug: '/hunde/summer',
        type: 'fzucht',
        headImage: media('head'),
        standImage: media('stand'),
        teaserImage: media('teaser'),
        description: [paragraph('Beschreibung von Summer')],
        gallery: [{ id: 'g1', image: media('gallery-1') }],
        ...pedigreeParents,
        isShowsActive: false,
        isExamsActive: false,
        isBreedActive: false,
        updatedAt: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        ...overrides,
    }) as Dog

export const litter = (overrides: Partial<Litter> = {}): Litter =>
    ({
        id: 'litter-1',
        name: 'A-Wurf',
        slug: '/wuerfe/a-wurf',
        collage: media('collage'),
        description: [paragraph('Unser erster Wurf')],
        ...pedigreeParents,
        tabs: [],
        isActive: false,
        puppies: [],
        updatedAt: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        ...overrides,
    }) as Litter
