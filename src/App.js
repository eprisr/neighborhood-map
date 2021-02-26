import React from 'react';
import { Route } from 'react-router-dom';
import GoogleApiWrapper from './utils/GoogleApiWrapper'
import Sidebar from './Sidebar';
import './App.css';
import swal from 'sweetalert';
import escapeRegExp from 'escape-string-regexp';

const client_id = 'CRWQUQAJO1D0PM5IPSXI4TVTM3X2KHLZCJ4K5AD3E0INWJUS';
const client_secret = 'FRFNPXEMRBYDAESQGEJF3YUUVZALZHZT1QHCIBCKFXAAFPZW';
const v = '20180323';
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
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=${v}&limit=20&near=${near}&query=smoothie`)
      .then((response) => {
        //If response is an error due to query...
        if(!response.ok) {
          throw Error(console.log)
        }

        //Successful response
        return response.json()
      })
      //Update locations array from data
      .then((data) => this.setState({ locations: data.response.venues }, () => {
        if(this.state.results.length === 0) {
          this.setState({ results: this.state.locations })
        }

        this.updateMap()
      } ))
      .catch((error) =>
        swal("WARNING!", "Unable to Retrieve Data.", "warning")
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
      let lat = this.state.locations[0].location.lat
      let lng = this.state.locations[0].location.lng
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
          <Route exact path='/' render={() => (
            <GoogleApiWrapper
              userInput={this.state.userInput}
              results={this.state.results}
              center={this.state.center}
              result={this.state.result}
            />
          )} />
        }
      </div>
    );
  }
}

export default App;
