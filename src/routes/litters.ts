import payload from 'payload'
import { withContext, withMeta } from '../util'

import express from 'express'
const litterRouter = express.Router()

litterRouter.get('/', async (req, res) => {
    const litters = await payload
        .find({ collection: 'litters', locale: 'de' })
        .then((data) => data.docs)
    res.render('litter', await withContext(litters))
    res.render(
        'litter',
        await withMeta(withContext(litters), {
            metaTitle: 'Würfe',
            metaDescription: 'Würfe - Moments of Love',
            pageUrl: `${process.env.BASE_URL}/wuerfe`,
        })
    )
})

litterRouter.get('/:id', async (req, res, next) => {
    const litter = await payload
        .find({
            collection: 'litters',
            locale: 'de',
            where: { slug: { like: req.params.id } },
        })
        .then((data) => data.docs[0])
    if (litter) {
        res.render(
            'litter',
            await withMeta(withContext(litter), {
                metaTitle: litter.name,
                metaDescription: litter.metaDescription
                    ? litter.metaDescription
                    : litter.name,
                image: litter.collage,
                pageUrl: `${process.env.BASE_URL}${litter.slug}`,
            })
        )
    }
    next()
})

export { litterRouter }
