import { APIProvider } from '@vis.gl/react-google-maps'
import GoogleMap from './components/Map'
interface ProviderProps {
	center: { lat: number; lng: number }
}

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY_DEMO

function MapsProvider({ center }: ProviderProps) {
	return (
		<APIProvider
			apiKey={MAPS_API_KEY}
			onLoad={() => console.log('Maps API has loaded.')}>
			<GoogleMap center={center} />
		</APIProvider>
	)
}

export default MapsProvider
