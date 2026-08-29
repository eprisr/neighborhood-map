import { APIProvider } from '@vis.gl/react-google-maps'
import GoogleMap from './components/Map'

interface ProviderProps {
	results: any[]
	center: { lat: number; lng: number }
	result: object
}

function MapsProvider({ results, center, result }: ProviderProps) {
	const MAPS_API_KEY = process.env.GOOGLE_MAPS_DEMO_KEY || ''

	return (
		<APIProvider
			apiKey={MAPS_API_KEY}
			onLoad={() => console.log('Maps API has loaded.')}>
			<GoogleMap results={results} center={center} result={result} />
		</APIProvider>
	)
}

export default MapsProvider
