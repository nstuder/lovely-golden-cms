import payload from "payload";
import { withContext, withMeta } from "../util";

export const siteRoute = async (req, res) => {
    const path = req.path
    const page = await payload.find({
        collection: 'pages', locale: 'de',
        where: { slug: { like: path } }
    }).then(data => data.docs[0])
    if (page) {
        res.render('page', await withMeta(await withContext(page), {
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            pageUrl: `${process.env.BASE_URL}${page.slug}`
        }))
    } else {
        res.render('404', await withContext({}))
    }
}
