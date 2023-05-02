import express from 'express'
import { engine } from 'express-handlebars'
import payload from 'payload'
import path from 'path'
import robots from 'express-robots-txt'
import * as dotenv from 'dotenv'
dotenv.config()

const NEWS_LIMIT = 10

const app = express()
const start = async () => {
	const withContext = async (data) => {
		return {
			...data,
			...{
				global: {
					navigation: await payload.findGlobal({ slug: 'navigation', locale: 'de' }),
					configuration: await payload.findGlobal({ slug: 'configuration', locale: 'de' })
				}
			}
		}
	}

	const withMeta = async (context, data) => {
		return {
			...(await context),
			meta: {
				...(await payload.findGlobal({ slug: 'seo', locale: 'de' })),
				...data,
			}
		}
	}


	app.engine('hbs', engine({
		defaultLayout: 'main',
		extname: '.hbs',
		helpers: {
			eq: (a, b, options) => {
				if (a === b) {
					return options.fn(this)
				}
				return options.inverse(this)
			},
			toLocalDate: (a: string) => {
				return (new Date(a)).toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' })
			}
		}
	}))

	app.set('view engine', 'hbs')
	app.set('views', path.join(__dirname, 'views'))

	// Initialize Payload
	await payload.init({
		secret: process.env.PAYLOAD_SECRET,
		mongoURL: process.env.MONGODB_URI,
		express: app,
		onInit: () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
		},
	})

	app.use('/assets', express.static(path.join(__dirname, 'public')))

	app.use(robots({
		UserAgent: '*',
		Disallow: '/',
		CrawlDelay: '5',
		Sitemap: process.env.BASE_URL + '/sitemap.xml',
	}))

	app.get('/sitemap.xml', async (req, res) => {
		const navigation = await await payload.findGlobal({ slug: 'navigation', locale: 'de' })
		const pageUrls = navigation.items.flatMap(item => {
			if (item.type == 'link') {
				if (item.linkType == 'external') {
					return item.pageExtern
				} else {
					return item.pageIntern.value.slug
				}
			} else if (item.type == 'subMenu') {
				return item.subMenu.items.map(subItem => {
					if (subItem.linkType == 'external') {
						return subItem.slugExtern
					} else {
						return subItem.slugIntern.value.slug
					}
				})
			}
		}).map(url => process.env.BASE_URL + url)
		res.setHeader('Content-Type', 'application/xml')
		res.render('sitemap', { layout: false, urls: pageUrls })
	})

	// Add your own express routes here
	app.get('/', async (req, res) => {
		const home = await payload.findGlobal({ slug: 'home', locale: 'de' })
		const news = await payload.find({ collection: 'news', locale: 'de', limit: 5, sort: '-publishedAt' }).then(data => data.docs)
		res.render('home', await withMeta(withContext({ ...home, news }), {}))
	})

	app.get('/hunde', async (req, res) => {
		const dogs = await payload.find({ collection: 'dogs', locale: 'de' })
			.then(data => data.docs)
		const dogsInCategories = {
			breed: dogs.filter(d => d.type === 'fzucht' || d.type === 'rzucht'),
			young: dogs.filter(d => d.type === 'young'),
			retirement: dogs.filter(d => d.type === 'retirement'),
			dead: dogs.filter(d => d.type === 'dead'),
		}
		res.render('dogs', await withMeta(withContext(dogsInCategories), {
			metaTitle: 'Hunde',
			metaDescription: 'Hunde - Moments of Love',
			pageUrl: `${process.env.BASE_URL}/hunde`
		}))
	})

	app.get('/hunde/:id', async (req, res, next) => {
		const dog = await payload.find({
			collection: 'dogs', locale: 'de',
			where: { slug: { like: req.params.id } }
		}).then(data => data.docs[0])
		if (dog) {
			res.render('dog', await withMeta(withContext(dog), {
				metaTitle: `${dog.breedingName} - ${dog.name}`,
				metaDescription: dog.metaDescription,
				image: dog.teaserImage,
				pageUrl: `${process.env.BASE_URL}${dog.slug}`
			}))
		} else {
			next()
		}
	})

	app.get('/wuerfe', async (req, res) => {
		const litters = await payload.find({ collection: 'litters', locale: 'de' })
			.then(data => data.docs)
		res.render('litter', await withContext(litters))
		res.render('litter', await withMeta(withContext(litters), {
			metaTitle: 'Würfe',
			metaDescription: 'Würfe - Moments of Love',
			pageUrl: `${process.env.BASE_URL}/wuerfe`
		}))
	})

	app.get('/wuerfe/:id', async (req, res, next) => {
		const litter = await payload.find({
			collection: 'litters', locale: 'de',
			where: { slug: { like: req.params.id } }
		}).then(data => data.docs[0])
		if (litter) {
			res.render('litter', await withMeta(withContext(litter), {
				metaTitle: litter.name,
				metaDescription: litter.metaDescription ? litter.metaDescription : litter.name,
				image: litter.collage,
				pageUrl: `${process.env.BASE_URL}${litter.slug}`
			}))
		}
		next()
	})

	app.get('/aktuelles', async (req, res, next) => {
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

	app.get('/aktuelles/:id', async (req, res, next) => {
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

	app.get('/galerie', async (req, res) => {
		const galleries = await payload.find({ collection: 'gallery', locale: 'de' })
			.then(data => data.docs)
		res.render('galleries', await withMeta(withContext({ galleries: galleries }), {
			metaTitle: 'Galerie',
			metaDescription: 'Galerie',
			pageUrl: `${process.env.BASE_URL}/galerie`
		}))
	})

	app.get('/gallerie/:id', async (req, res, next) => {
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

	app.get('/*', async (req, res) => {
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
	})

	app.listen(3000)
}

start()