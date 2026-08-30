import { useCallback, useEffect, useMemo, useState } from 'react'
import {
	AdvancedMarker,
	AdvancedMarkerRef,
	InfoWindow,
	Map,
	Pin,
	useMap,
} from '@vis.gl/react-google-maps'
import * as markerclusterer from '@googlemaps/markerclusterer'
import { Venue } from '../types'

interface MapProps {
	results: any[]
	result: {
		result: {
			fsq_place_id: string
		}
	}
	center: { lng: number; lat: number }
}
const { MarkerClusterer } = markerclusterer

const MAP_ID = import.meta.env.MAP_ID

function GoogleMap({ results, result, center }: MapProps) {
	const map = useMap()
	const [markers, setMarkers] = useState<object>({})
	const [selectedResultKey, setSelectedResultKey] = useState<string | null>('')

	useEffect(() => {
		closeInfoWindow()
		if (!map) return
		map.panTo(center)
	}, [center])

	useEffect(() => {
		if (result.result) setSelectedResultKey(result.result.fsq_place_id)
	}, [result])

	const clusterer = useMemo(() => {
		if (!map) return null
		return new MarkerClusterer({ map })
	}, [map])

	useEffect(() => {
		if (!clusterer) return

		clusterer.clearMarkers()
		clusterer.addMarkers(Object.values(markers))
	}, [clusterer, markers])

	const setMarkerRef = useCallback(
		(marker: AdvancedMarkerRef, key: Venue[fsq_place_id]) => {
			setMarkers((markers) => {
				if ((marker && markers[key]) || (!marker && !markers[key]))
					return markers

				if (marker) {
					return { ...markers, [key]: marker }
				} else {
					const { [key]: _, ...newMarkers } = markers

					return newMarkers
				}
			})
		},
		[],
	)

	const selectedResult = useMemo(
		() =>
			results && selectedResultKey
				? results.find((r) => r.fsq_id === selectedResultKey)
				: null,
		[results, selectedResultKey],
	)

	const closeInfoWindow = useCallback(() => {
		setSelectedResultKey(null)
	}, [])

	const clickMarker = useCallback(
		(venue: Venue, ev: google.maps.marker.AdvancedMarkerClickEvent) => {
			setSelectedResultKey(venue.fsq_place_id)

			if (!map) return
			map.panTo(ev.latLng)
		},
		[],
	)

	return (
		<Map defaultZoom={10} defaultCenter={center} mapId={MAP_ID}>
			{results &&
				results.map((venue) => (
					<MapMarker
						key={venue.fsq_place_id}
						venue={venue}
						onClick={clickMarker}
						setMarkerRef={setMarkerRef}
					/>
				))}

			{selectedResultKey && (
				<InfoWindow
					anchor={markers[selectedResultKey]}
					onCloseClick={closeInfoWindow}>
					<h2>INFOWINDOW</h2>
					{selectedResult?.name}
				</InfoWindow>
			)}
		</Map>
	)
}

export default GoogleMap

interface MapMarkerProps {
	venue: Venue
	onClick: (venue: any, ev: any) => void
	setMarkerRef: (marker: any, key: any) => void
}

const MapMarker = ({ venue, onClick, setMarkerRef }: MapMarkerProps) => {
	const handleMarkerClick = useCallback(
		(ev: google.maps.marker.AdvancedMarkerClickEvent) => onClick(venue, ev),
		[onClick, venue],
	)
	const ref = useCallback(
		(marker: AdvancedMarkerRef) => {
			setMarkerRef(marker, venue.fsq_place_id)
		},
		[setMarkerRef, venue.fsq_place_id],
	)

	return (
		<AdvancedMarker
			ref={ref}
			position={{
				lat: venue.latitude,
				lng: venue.longitude,
			}}
			onClick={handleMarkerClick}>
			<Pin />
		</AdvancedMarker>
	)
}
