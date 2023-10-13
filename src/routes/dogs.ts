import payload from 'payload'
import { withContext, withMeta } from '../util'
import express from 'express'

const dogRouter = express.Router()

dogRouter.get('/', async (req, res) => {
    const dogs = await payload
        .find({ collection: 'dogs', locale: 'de' })
        .then((data) => data.docs)
    const dogsInCategories = {
        breed: dogs.filter((d) => d.type === 'fzucht' || d.type === 'rzucht'),
        young: dogs.filter((d) => d.type === 'young'),
        retirement: dogs.filter((d) => d.type === 'retirement'),
        dead: dogs.filter((d) => d.type === 'dead'),
    }
    res.render(
        'dogs',
        await withMeta(withContext(dogsInCategories), {
            metaTitle: 'Hunde',
            metaDescription: 'Hunde - Moments of Love',
            pageUrl: `${process.env.BASE_URL}/hunde`,
        })
    )
})

dogRouter.get('/:id', async (req, res, next) => {
    const dog = await payload
        .find({
            collection: 'dogs',
            locale: 'de',
            where: { slug: { like: req.params.id } },
        })
        .then((data) => data.docs[0])
    if (dog) {
        res.render(
            'dog',
            await withMeta(withContext(dog), {
                metaTitle: `${dog.breedingName} - ${dog.name}`,
                metaDescription: dog.metaDescription,
                image: dog.teaserImage,
                pageUrl: `${process.env.BASE_URL}${dog.slug}`,
            })
        )
    } else {
        next()
    }
})

export { dogRouter }
