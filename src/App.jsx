import React, { useState, useEffect } from 'react';
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
function App() {
	const [locations, setLocations] = useState(null);
	const [results, setResults] = useState([]);
	const [result, setResult] = useState({});
	const [userInputValue, setUserInputValue] = useState({ near: '' });
	const [center, setCenter] = useState({ lat: 41.85003, lng: -87.65005 });
	const [dataComplete, setDataComplete] = useState(false);
	
  //Fetch data when component mounts
  useEffect(() => {
		this.getData('Chicago, IL')
  })

  //Fetch data function
  const getData = (near) => {
    setDataComplete(false)
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
			.then((response) => {
				setLocations(response.results)
      })
      .catch((error) =>
				Swal.fire({
					icon: "error",
					title: "ERROR!",
					text: "Unable to Retrieve Data.",
				})
      );
	}
	
	useEffect(() => {
		if (results.length === 0) setResults(locations)

    updateMap()
	}, [locations])
	

  //Grab query from search by venue name input
  const getQuery = (query) => {
    if( query !== '' && query !== undefined) {
      const venue = new RegExp(escapeRegExp(query), 'i');
		  // this.setState((state) => ({
      //   results: state.locations.filter((location) => venue.test(location.name))
      // }) );
		  setResults(locations.filter((location) => venue.test(location.name)));
		} else {
      setResults(locations)
    }
  }

  //Grab near from search by location input
  const getNear = (near) => {
    userInput(near);
  }

  const getResult = (r) => {
    let index = results.indexOf(r)
    setResult({ result: r, index: index })
  }

  const userInput = (near) => {
    // this.setState({ userInputValue: {near: near} }, () => {
    //   this.getData(near);
		// })
		setUserInputValue({ near: near })
	}
	
	useEffect(() => {
		getData()
	}, [userInputValue])
	

  const updateMap = () =>{
    updateCenter()
    updateResults()
  }

  const updateCenter = () => {
    if(locations[0] !== undefined || locations !== null) {
      let lat = locations[0].geocodes.main.latitude
      let lng = locations[0].geocodes.main.longitude
      setCenter({lat: lat, lng: lng })
    } else {
      return;
    }
  }

  const updateResults = () => {
    setResults(locations)
    setDataComplete(true)
  }

	let retrievedData = dataComplete;

	return (
		<div className="App">
			<Sidebar
				locations={locations}
				getQuery={getQuery}
				getNear={getNear}
				results={results}
				resultClicked={getResult}
			/>
			<APIProvider apiKey={MAPS_API_KEY}>
				<GoogleMap
					userInput={userInputValue}
					results={results}
					center={center}
					result={result}
				/>
			</APIProvider>
			{/* { retrievedData === true &&
				<GoogleApiWrapper
					userInput={userInputValue}
					results={results}
					center={center}
					result={result}
				/>
			} */}
		</div>
	)
}

export default App;
