import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from '@vis.gl/react-google-maps'

let map;
function GoogleMap({ google, userInput, results, result, center}) {
	// const [markers, setMarkers] = useState([]);
	// const [selectedResult, setSelectedResult] = useState([]);

	// //Update map when first loaded
	// useEffect(() => {
	// 	loadMap();
	// }, [])
	

	// //Map has already been loaded previously
	// useEffect(() => {
	// 	loadMap()
	// }, [google])
	

	// 	//Check for change in location & load map and markers according to new center
	//	useEffect(() => {
		// 	shiftCenter();
		// 	clearMarkers();
		// 	createMarkers();
	//	}, [userInput])

	// 	//Check for change in result in list that has been clicked & add animation, open infowindow
	// useEffect(() => {
		// 		let i = result.index;
		// 		markerClicked(markers[i]);
	// }, [result])
	
	// //Load map - Equivalent to calling initMap() in JS
	// const loadMap = () => {
	// 	//Google API Available
	//   if (google) {
	// 		//Reference DOM element for map
	// 		const node = ReactDOM.findDOMNode(this.refs.map);

	// 		const mapOptions = {
	// 			center: new = google.maps.LatLng(=center),
	// 			zoom: 14,
	// 			// styles: styles,
	// 			mapTypeControl: false
	// 		}

	// 		//Initialize Google Maps
	// 		map = new = google.maps.Map(node, mapOptions)
	//   }

	// 	createMarkers();
	// }

	// const shiftCenter = () => {
  //   let center = new google.maps.LatLng(center);
  //   map.panTo(center);
	// }

	// const createMarkers = () => {
	// 	//Loop through locations array for location & name
	// 	results.forEach((venue) => {
	// 		//Create markers
	// 		let position = {
	// 			lat: venue.location.lat,
	// 			lng: venue.location.lng
	// 		};
	// 		let marker = new google.maps.Marker({
	// 			position: position,
	// 			title: venue.name,
	// 			animation: google.maps.Animation.DROP,
	// 			map: map
	// 		})

	// 		//Create infowindow
	// 		marker.infoWindow = new google.maps.InfoWindow({
	// 			content: marker.title + '\n' + venue.location.formattedAddress,
	// 			maxWidth: 200
	// 		});

	// 		//Add listener
	// 		marker.addListener('click', ()=> {
	// 			markerClicked(marker);
	// 		})

	// 		state.markers.push(marker)
	// 	})
	// }

	// const clearMarkers = () => {
	// 	markers.forEach((marker) => {
	// 		marker.setMap(null);
	// 	})
	// 	markers.pop();
	// }

	// const markerClicked = (marker) => {
	// 	//Close open infoWindows and animations
	// 	if(selectedResult.length === 1) {
	// 		let currentMarker = selectedResult[0];
	// 		currentMarker.infoWindow.close();
	// 		currentMarker.setAnimation(null);

	// 		if(currentMarker.title === marker.title) {
	// 			return;
	// 		}

	// 		selectedResult.shift();
	// 	}

	// 	console.log(selectedResult)

	// 	selectedResult.push(marker);

	// 	//Set marker animation
	// 	marker.setAnimation(google.maps.Animation.BOUNCE)

	// 	//Clears marker animation when closed from window
	// 	marker.infoWindow.addListener('closeclick', () => {
	// 		marker.setAnimation(null);
	// 		selectedResult.shift();
	// 		console.log(selectedResult)
	// 	})

	// 	//Open infoWindow
	// 	marker.infoWindow.open(map, marker);
	// }

	//Set container to display full page
	const style = {
		width: '100vw',
		height: '100vh'
	};

	return (
		<div>
			<div
				//To be referenced in initMap()
				// ref="map"
				style={style}>
				Loading map...
				<Map
					defaultZoom={14}
					defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
				></Map>
			</div>
		</div>
	)
}

export default GoogleMap;
