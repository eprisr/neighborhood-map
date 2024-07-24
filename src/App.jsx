import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import Sidebar from './Sidebar';
import './App.css';
import Swal from 'sweetalert2';
import escapeRegExp from 'escape-string-regexp';
import GoogleMap from './Map';

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const FOURSQUARE_API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;

// const client_id = import.meta.env.FOURSQUARE_CLIENT_ID;
// const client_secret = import.meta.env.FOURSQUARE_CLIENT_SECRET;
// const v = '20180323';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `${FOURSQUARE_API_KEY}`,
  },
}
class App extends React.Component {
	
	state = {
		locations: null,
    results: [],
    result: {},
    userInput: {near: ''},
    center: {lat: 41.85003, lng: -87.65005},
    dataComplete: false
  }
	
  //Fetch data when componenet mounts
  componentDidMount() {
		this.getData('Chicago, IL')
  }

  //Fetch data function
  getData(near) {
    this.setState({ dataComplete: false })
  //Fetch locations from FourSquare Search API
    fetch(`https://api.foursquare.com/v3/places/search?query=smoothie&near=${near}&sort=DISTANCE&limit=50`, options)
      .then((response) => {
        //If response is an error due to query...
        if(!response.ok) {
          throw Error(console.log)
        }

        //Successful response
        return response.json()
      })
      //Update locations array from data
      .then((response) => this.setState({ locations: response.results }, () => {
        if(this.state.results.length === 0) {
          this.setState({ results: this.state.locations })
        }

        this.updateMap()
      } ))
      .catch((error) =>
				Swal.fire({
					icon: "error",
					title: "ERROR!",
					text: "Unable to Retrieve Data.",
				})
      );
  }

  //Grab query from search by venue name input
  getQuery = (query) => {
    if( query !== '' && query !== undefined) {
      const venue = new RegExp(escapeRegExp(query), 'i');
		  this.setState((state) => ({
        results: state.locations.filter((location) => venue.test(location.name))
      }) );
		} else {
      this.setState({ results: this.state.locations })
    }
  }

  //Grab near from search by location input
  getNear = (near) => {
    this.userInput(near);
  }

  getResult = (r) => {
    let index = this.state.results.indexOf(r)
    this.setState({ result: {result: r, index: index} })
  }

  userInput = (near) => {
    this.setState({ userInput: {near: near} }, () => {
      this.getData(near);
    })
  }

  updateMap = () =>{
    this.updateCenter()
    this.updateResults()
  }

  updateCenter() {
    if(this.state.locations[0] !== undefined || this.state.locations !== null) {
      let lat = this.state.locations[0].geocodes.main.latitude
      let lng = this.state.locations[0].geocodes.main.longitude
      this.setState({ center: {lat: lat, lng: lng} })
    } else {
      return;
    }
  }

  updateResults() {
    this.setState({ results: this.state.locations })
    this.setState({ dataComplete: true })
  }

  render() {
    let retrievedData = this.state.dataComplete;

    return (
      <div className="App">
        <Sidebar
          locations={this.state.locations}
          getQuery={this.getQuery}
          getNear={this.getNear}
          results={this.state.results}
          resultClicked={this.getResult}
        />
        <APIProvider apiKey={MAPS_API_KEY}>
          <GoogleMap
            userInput={this.state.userInput}
            results={this.state.results}
            center={this.state.center}
            result={this.state.result}
          />
        </APIProvider>
        {/* { retrievedData === true &&
					<GoogleApiWrapper
						userInput={this.state.userInput}
						results={this.state.results}
						center={this.state.center}
						result={this.state.result}
					/>
        } */}
      </div>
    )
  }
}

export default App;
