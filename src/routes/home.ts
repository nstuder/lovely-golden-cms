import payload from "payload";
import { withContext, withMeta } from "../util";

export const homeRoute = async (req, res) => {
    const home = await payload.findGlobal({ slug: 'home', locale: 'de' })
    const news = await payload.find({ collection: 'news', locale: 'de', limit: 5, sort: '-publishedAt' }).then(data => data.docs)
    res.render('home', await withMeta(withContext({ ...home, news }), {}))
}