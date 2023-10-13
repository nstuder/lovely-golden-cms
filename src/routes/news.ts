import payload from "payload";
import { withContext, withMeta } from "../util";
var express = require('express');
var newsRouter = express.Router();

const NEWS_LIMIT = 10

newsRouter.get('/', async (req, res, next) => {
    const news = await payload.find({ collection: 'news', locale: 'de', sort: '-publishedAt', limit: NEWS_LIMIT })
        .then(data => data)
    if (news.docs) {
        const pages = Array.from({ length: news.totalPages }, (_, index) => ({ isActive: false, number: index + 1 }))
        const { prevPage, nextPage, docs } = news
        res.render('news', await withMeta(withContext({
            news: docs,
            nextPage,
            prevPage,
            pages,
        }), {
            metaTitle: 'Aktuelles',
            metaDescription: 'Aktuelles',
            pageUrl: `${process.env.BASE_URL}/aktuelles`
        }))
    } else {
        next()
    }
})

newsRouter.get('/:id', async (req, res, next) => {
    const page = parseInt(req.params.id, 10)
    const news = await payload.find({
        collection: 'news', locale: 'de', sort: '-publishedAt',
        page: page, limit: NEWS_LIMIT
    })
    if (news.docs) {
        const { prevPage, nextPage, docs, page } = news
        const pages = Array.from({ length: news.totalPages }, (_, index) => ({ isActive: (index + 1) === page, number: index + 1 }))
        res.render('news', await withMeta(withContext({
            news: docs,
            nextPage,
            prevPage,
            pages,
        }), {
            metaTitle: 'Aktuelles',
            metaDescription: 'Aktuelles',
            pageUrl: `${process.env.BASE_URL}/aktuelles`
        }))
    } else {
        next()
    }
})

export { newsRouter }