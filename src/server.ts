import express from 'express'
import { engine } from 'express-handlebars'
import payload from 'payload'
import path from 'path'
import * as dotenv from 'dotenv' 
dotenv.config()

const app = express()
const start = async () => {
	const withContext = async (data) => {
		return {
			...data,
			...{
				global: {
					seo: await payload.findGlobal({ slug: 'seo', locale: 'de' }),
					navigation: await payload.findGlobal({ slug: 'navigation', locale: 'de' }),
					configuration: await payload.findGlobal({ slug: 'configuration', locale: 'de' })
				}
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

	// Add your own express routes here
	app.get('/', async (req, res) => {
		const home = await payload.findGlobal({ slug: 'home', locale: 'de' })
		res.render('home', await withContext(home))
	})

	app.get('/hunde', async (req, res) => {
		const dogs = await payload.find({ collection: 'dogs', locale: 'de' })
			.then(data => data.docs)
		res.render('dogs', await withContext({dogs: dogs}))
	})

	app.get('/hunde/:id', async (req, res) => {
		const dog = await payload.find({
			collection: 'dogs', locale: 'de',
			where: { name: { equals: req.params.id } }
		}).then(data => data.docs[0])
		res.render('dog', await withContext(dog))
	})

	app.get('/wuerfe', async (req, res) => {
		const litters = await payload.find({ collection: 'litters', locale: 'de' })
			.then(data => data.docs)
		res.render('litter', await withContext(litters))
	})

	app.get('/wuerfe/:id', async (req, res) => {
		const litter = await payload.find({
			collection: 'litters', locale: 'de',
			where: { name: { equals: req.params.id } }
		}).then(data => data.docs[0])
		res.render('litter', await withContext(litter))
	})

	app.get('/gallerie', async (req, res) => {
		const galleries = await payload.find({ collection: 'gallery', locale: 'de' })
			.then(data => data.docs)
		res.render('galleries', await withContext({galleries: galleries}))
	})

	app.get('/gallerie/:id', async (req, res) => {
		const gallery = await payload.find({
			collection: 'gallery', locale: 'de',
			where: { name: { equals: req.params.id } }
		}).then(data => data.docs[0])
		res.render('gallery', await withContext(gallery))
	})

	app.get('/*', async (req, res) => {
		const path = req.path
		const page = await payload.find({
			collection: 'pages', locale: 'de',
			where: { path: { equals: path } }
		}).then(data => data.docs[0])
			.catch(() => res.render('404'))
		res.render('page', await withContext(page))
	})

	app.listen(3000)
}

start()