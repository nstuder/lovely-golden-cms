import payload from 'payload'

export const sitemapRoute = async (req, res) => {
    const navigation = await await payload.findGlobal({
        slug: 'navigation',
        locale: 'de',
    })
    const pageUrls = navigation.items
        .flatMap((item) => {
            if (item.type == 'link') {
                if (item.linkType == 'external') {
                    return item.pageExtern
                } else {
                    return item.pageIntern.value.slug
                }
            } else if (item.type == 'subMenu') {
                return item.subMenu.items.map((subItem) => {
                    if (subItem.linkType == 'external') {
                        return subItem.slugExtern
                    } else {
                        return subItem.slugIntern.value.slug
                    }
                })
            }
        })
        .map((url) => process.env.BASE_URL + url)

    const galleryUrls = (
        await payload
            .find({ collection: 'gallery', locale: 'de' })
            .then((data) => data.docs)
    ).map((doc) => `${process.env.BASE_URL}${doc.slug}`)
    const dogUrls = (
        await payload
            .find({ collection: 'dogs', locale: 'de' })
            .then((data) => data.docs)
    ).map((doc) => `${process.env.BASE_URL}${doc.slug}`)

    res.setHeader('Content-Type', 'application/xml')
    res.render('sitemap', {
        layout: false,
        urls: [...pageUrls, ...galleryUrls, ...dogUrls],
    })
}
