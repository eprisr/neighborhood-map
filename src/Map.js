import React from 'react';
import ReactDOM from 'react-dom';

let map;

class GoogleMap extends React.Component {
	state = {
		markers: [],
		selectedResult: [],
	}

	//Update map when first loaded
	componentDidMount() {
		this.loadMap();
	}

	//Map has already been loaded previously
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.google !== this.props.google) {
			this.loadMap();
		}

		//Check for change in location & load map and markers according to new center
		if (prevProps.userInput !== this.props.userInput) {
			this.shiftCenter();
			this.clearMarkers();
			this.createMarkers();
		}

		//Check for change in result in list that has been clicked & add animation, open infowindow
		if (prevProps.result !== this.props.result) {
			let i = this.props.result.index;
			this.markerClicked(this.state.markers[i]);
		}
  }

	//Load map - Equivalent to calling initMap() in JS
	loadMap() {
		//Google API Available
	  if (this.props.google) {
			//Reference DOM element for map
			const node = ReactDOM.findDOMNode(this.refs.map);

			const mapOptions = {
				center: new this.props.google.maps.LatLng(this.props.center),
				zoom: 14,
				// styles: styles,
				mapTypeControl: false
			}

			//Initialize Google Maps
			map = new this.props.google.maps.Map(node, mapOptions)
	  }

		this.createMarkers();
	}

	shiftCenter() {
    let center = new this.props.google.maps.LatLng(this.props.center);
    map.panTo(center);
	}

	createMarkers() {
		//Loop through locations array for location & name
		this.props.results.forEach((venue) => {
			//Create markers
			let position = {
				lat: venue.location.lat,
				lng: venue.location.lng
			};
			let marker = new this.props.google.maps.Marker({
				position: position,
				title: venue.name,
				animation: this.props.google.maps.Animation.DROP,
				map: map
			})

			//Create infowindow
			marker.infoWindow = new this.props.google.maps.InfoWindow({
				content: marker.title + '\n' + venue.location.formattedAddress,
				maxWidth: 200
			});

			//Add listener
			marker.addListener('click', ()=> {
				this.markerClicked(marker);
			})

			this.state.markers.push(marker)
		})
	}

	clearMarkers() {
		this.state.markers.forEach((marker) => {
			marker.setMap(null);
		})
		this.state.markers.pop();
	}

	markerClicked(marker) {
		//Close open infoWindows and animations
		if(this.state.selectedResult.length === 1) {
			let currentMarker = this.state.selectedResult[0];
			currentMarker.infoWindow.close();
			currentMarker.setAnimation(null);

			if(currentMarker.title === marker.title) {
				return;
			}

			this.state.selectedResult.shift();
		}

		console.log(this.state.selectedResult)

		this.state.selectedResult.push(marker);

		//Set marker animation
		marker.setAnimation(this.props.google.maps.Animation.BOUNCE)

		//Clears marker animation when closed from window
		marker.infoWindow.addListener('closeclick', () => {
			marker.setAnimation(null);
			this.state.selectedResult.shift();
			console.log(this.state.selectedResult)
		})

		//Open infoWindow
		marker.infoWindow.open(map, marker);
	}

	render() {
		//Set container to display full page
		const style = {
			width: '100vw',
			height: '100vh'
		};

		return (
			<div>
				<div
					//To be referenced in initMap()
					ref="map"
					style={style}
				>
					Loading map...
				</div>
			</div>
		);
	}
}

export default GoogleMap;
