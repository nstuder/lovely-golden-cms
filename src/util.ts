import payload from 'payload'

export const withContext = async (data) => {
	return {
		...data,
		...{
			global: {
				navigation: await payload.findGlobal({
					slug: 'navigation',
					locale: 'de',
				}),
				configuration: await payload.findGlobal({
					slug: 'configuration',
					locale: 'de',
				}),
			},
		},
	}
}

export const withMeta = async (context, data) => {
	return {
		...(await context),
		meta: {
			...(await payload.findGlobal({ slug: 'seo', locale: 'de' })),
			...data,
		},
	}
}

export const hbsHelpers = {
	eq: (a, b, options) => {
		if (a === b) {
			return options.fn(this)
		}
		return options.inverse(this)
	},
	toLocalDate: (a: string) => {
		return new Date(a).toLocaleDateString('de-DE', {
			timeZone: 'Europe/Berlin',
		})
	},
}
