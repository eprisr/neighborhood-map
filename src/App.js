import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GoogleApiWrapper from './utils/GoogleApiWrapper'
import Sidebar from './Sidebar';
import './App.css';
import Swal from 'sweetalert2';
import escapeRegExp from 'escape-string-regexp';

// const client_id = process.env.FOURSQUARE_CLIENT_ID;
// const client_secret = process.env.FOURSQUARE_CLIENT_SECRET;
// const v = '20180323';
const options = {
	method: 'GET',
	headers: {
		Accept: 'application/json',
		Authorization: 'fsq3am5tPijW0ZnoyobGDYpCqGdbLbLPwdZ27H2dSxKPlq8='
	}
};
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
        { retrievedData === true &&
					<Routes>
						<Route exact path='/' render={() => (
							<GoogleApiWrapper
								userInput={this.state.userInput}
								results={this.state.results}
								center={this.state.center}
								result={this.state.result}
							/>
						)} />
					</Routes>
        }
      </div>
    );
  }
}

export default App;
