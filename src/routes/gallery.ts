import payload from "payload";
import { withContext, withMeta } from "../util";

var express = require('express');
var galleryRouter = express.Router();

galleryRouter.get('/', async (req, res) => {
    const galleries = await payload.find({ collection: 'gallery', locale: 'de' })
        .then(data => data.docs)
    res.render('galleries', await withMeta(withContext({ galleries: galleries }), {
        metaTitle: 'Galerie',
        metaDescription: 'Galerie',
        pageUrl: `${process.env.BASE_URL}/galerie`
    }))
})

galleryRouter.get('/:id', async (req, res, next) => {
    const gallery = await payload.find({
        collection: 'gallery', locale: 'de',
        where: { slug: { like: req.params.id } }
    }).then(data => data.docs[0])
    if (gallery) {
        res.render('gallery', await withMeta(withContext(gallery), {
            metaTitle: gallery.name,
            metaDescription: gallery.name,
            pageUrl: `${process.env.BASE_URL}${gallery.slug}`
        }))
    } else {
        next()
    }
})

export { galleryRouter }