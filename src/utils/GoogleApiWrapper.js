import React from 'react';
import {GoogleApiWrapper} from 'google-maps-react'; //NPMJS: https://www.npmjs.com/package/google-maps-react
import GoogleMap from '../Map';
import MapError from '../MapError';
// require('dotenv').config()
export class MapContainer extends React.Component {
	render() {
		//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component
		//If the API has not loaded, display Loading...
		//Wrapper passes a loaded state that changes to true once loaded
		// if (!this.props.loaded) {
		// 	return <div>Loading...</div>
		// }

		return (
			//NPMJS
			<div>
				{/* For Lazy-loading GoogleAPI  */}
				{/* <Map google={this.props.google} /> */}
				<GoogleMap
					google={window.google}
					userInput={this.props.userInput}
					results={this.props.results}
					result={this.props.result}
					center={this.props.center}
				/>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	//Loads API asynchronously into the DOM
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
	LoadingContainer: MapError
})(MapContainer)
