import express from 'express'
import { engine } from 'express-handlebars'
import payload from 'payload'
import path from 'path'
import robots from 'express-robots-txt'
import * as dotenv from 'dotenv'
import { sitemapRoute } from './routes/sitemap'
import { hbsHelpers } from './util'
import { dogRouter } from './routes/dogs'
import { litterRouter } from './routes/litters'
import { galleryRouter } from './routes/gallery'
import { newsRouter } from './routes/news'
import { homeRoute } from './routes/home'
import { siteRoute } from './routes/sites'
dotenv.config()

const app = express()
const start = async () => {
	app.engine(
		'hbs',
		engine({
			defaultLayout: 'main',
			extname: '.hbs',
			helpers: hbsHelpers,
		})
	)

	app.set('view engine', 'hbs')
	app.set('views', path.join(__dirname, 'views'))

	if (process.env.NODE_ENV === 'production') {
		app.use((req, res, next) => {
			if (!req.headers.host.match(/^www/))
				res.redirect(301, 'https://www.' + req.headers.host + req.url)
			else next()
		})
	}

	// Initialize Payload
	await payload.init({
		secret: process.env.PAYLOAD_SECRET,
		// mongoURL: process.env.MONGODB_URI,
		express: app,
		onInit: () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
		},
	})

	app.use('/assets', express.static(path.join(__dirname, 'public')))

	app.use(
		robots({
			UserAgent: '*',
			CrawlDelay: '5',
			Sitemap: process.env.BASE_URL + '/sitemap.xml',
		})
	)

	app.get('/sitemap.xml', sitemapRoute)
	app.get('/', homeRoute)

	app.use('/hunde', dogRouter)
	app.use('/wuerfe', litterRouter)
	app.use('/aktuelles', newsRouter)
	app.use('/galerie', galleryRouter)

	app.get('/*', siteRoute)

	app.listen(3000)
}

start()
