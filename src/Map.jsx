import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdvancedMarker, InfoWindow, Map, Pin, useMap } from '@vis.gl/react-google-maps'
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const MAP_ID = import.meta.env.VITE_MAP_ID

function GoogleMap({ results, result, center }) {
	const map = useMap();
	const [markers, setMarkers] = useState({});
	const [selectedResultKey, setSelectedResultKey] = useState(null);

	useEffect(() => {
		closeInfoWindow()
		if (!map) return;
		map.panTo(center)
	}, [center])

	useEffect(() => {
		if (result.result) setSelectedResultKey(result.result.fsq_id)
	}, [result])
	
	const clusterer = useMemo(() => {
		if (!map) return null;
		return new MarkerClusterer({ map });
	}, [map]);
	
	useEffect(() => {
		if (!clusterer) return;
		
		clusterer.clearMarkers();
		clusterer.addMarkers(Object.values(markers));
	}, [clusterer, markers])
	
	const setMarkerRef = useCallback(
		(marker, key) => {
			setMarkers(markers => {
				if ((marker && markers[key]) || (!marker && !markers[key])) return markers;
				
				if (marker) {
					return { ...markers, [key]: marker };
				} else {
					const { [key]: _, ...newMarkers } = markers;
					
					return newMarkers;
				}
			})
		},
		[],
	)

	const selectedResult = useMemo(
		() => results && selectedResultKey
			? results.find(r => r.fsq_id === selectedResultKey)
			: null,
		[results, selectedResultKey]
	);

	const closeInfoWindow = useCallback(() => {
		setSelectedResultKey(null);
	}, [])
	
	const clickMarker = useCallback((venue, ev) => {
		setSelectedResultKey(venue.fsq_id)

		if (!map) return
		map.panTo(ev.latLng)
	}, []);
	
	return (
    <Map defaultZoom={10} defaultCenter={center} mapId={MAP_ID}>
			{results && results.map(venue => (
				<MapMarker
					key={venue.fsq_id}
					venue={venue}
					onClick={clickMarker}
					setMarkerRef={setMarkerRef}
				/>
			))}
			
			{selectedResultKey && (
				<InfoWindow
					anchor={markers[selectedResultKey]}
					onCloseClick={closeInfoWindow}
				>
					<h2>INFOWINDOW</h2>
					{selectedResult?.name}
				</InfoWindow>
			)}
    </Map>
  )
}

export default GoogleMap;

const MapMarker = ({ venue, onClick, setMarkerRef }) => {
	const handleMarkerClick = useCallback((ev) => onClick(venue, ev), [onClick, venue]);
	const ref = useCallback(
		(marker) => {
			setMarkerRef(marker, venue.fsq_id)
		},
		[setMarkerRef, venue.fsq_id],
	)

	return (
		<AdvancedMarker
			ref={ref}
			position={{
				lat: venue.geocodes.main.latitude,
				lng: venue.geocodes.main.longitude,
			}}
			onClick={handleMarkerClick}>
			<Pin />
		</AdvancedMarker>
	)
}
