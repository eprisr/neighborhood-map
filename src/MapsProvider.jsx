import { APIProvider } from '@vis.gl/react-google-maps'
import GoogleMap from './components/Map'

function MapsProvider({ userInputValue, results, center, result }) {
	const MAPS_API_KEY = import.meta.env.GOOGLE_MAPS_DEMO_KEY

	return (
		<APIProvider
			apiKey={MAPS_API_KEY}
			onLoad={() => console.log('Maps API has loaded.')}>
			<GoogleMap
				userInput={userInputValue}
				results={results}
				center={center}
				result={result}
			/>
		</APIProvider>
	)
}

export default MapsProvider
