import React from 'react';
import { AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps'

const MAP_ID = import.meta.env.VITE_MAP_ID

function GoogleMap({ google, userInput, results, result, center }) {
	const markers = (
		<>
			{results.map((venue) => (
				<AdvancedMarker
					key={venue.fsq_id}
					position={{ lat: venue.geocodes.main.latitude, lng: venue.geocodes.main.longitude }}
				>
					<Pin />
				</AdvancedMarker>
			))
			}
		</>
	)
	
	return (
		<Map
			defaultZoom={14}
			defaultCenter={center}
			mapId={MAP_ID}
		>
			{markers}
		</Map>
	)
}

export default GoogleMap;
