// Vercel serverless function: proxies place search requests to Foursquare.
// Keeps FOURSQUARE_API_KEY server-side only — never exposed to the client bundle.
// Mirrors the /api/places route that used to live in server.js.

const FOURSQUARE_BASE_URL = 'https://places-api.foursquare.com'
const FOURSQUARE_API_VERSION = '2025-06-17'

export default async function handler(req, res) {
	const { near, query } = req.query

	const url = new URL('/places/search', FOURSQUARE_BASE_URL)
	url.searchParams.set('query', query ?? '')
	url.searchParams.set('near', near ?? '')
	url.searchParams.set('sort', 'DISTANCE')
	url.searchParams.set('limit', '50')

	try {
		const fsqRes = await fetch(url, {
			headers: {
				Authorization: `Bearer ${process.env.FOURSQUARE_API_KEY}`,
				'X-Places-Api-Version': FOURSQUARE_API_VERSION,
				Accept: 'application/json',
			},
		})

		const data = await fsqRes.json()
		res.status(fsqRes.status).json(data)
	} catch (err) {
		console.error('Error fetching data:', err)
		res.status(500).json({ error: 'Error fetching data' })
	}
}
