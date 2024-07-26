import React, { useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import Swal from 'sweetalert2';
import escapeRegExp from 'escape-string-regexp';
import Sidebar from './Sidebar';
import GoogleMap from './Map';
import './App.css';

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const FOURSQUARE_API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;

function App() {
  const [locations, setLocations] = useState(null)
  const [results, setResults] = useState([])
  const [result, setResult] = useState({})
  const [userInputValue, setUserInputValue] = useState({ near: '' })
  const [center, setCenter] = useState({ lat: 41.85003, lng: -87.65005 })
	const [dataComplete, setDataComplete] = useState(false)

	function getData(near) {
		setDataComplete(false);
		fetch(
      `https://api.foursquare.com/v3/places/search?query=smoothie&near=${near}&sort=DISTANCE&limit=50`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `${FOURSQUARE_API_KEY}`,
        },
      }
		).then((res) => {
			return res.json()
		}).then((res) => {
			setLocations(res.results)
			setResults(res.results)
			setDataComplete(true)
		}).catch((err) => {
			console.log(err)
			Swal.fire({
				title: "ERROR!",
				text: "Unable to Retrieve Data.",
				icon: "error",
				showCloseButton: true,
			})
		}
		)
	}

	const userInput = (near) => {
		setUserInputValue({ near });
		getData(near);
	}

	const getQuery = (query) => {
		if (query !== '' && query !== undefined) {
			const venue = new RegExp(escapeRegExp(query), 'i');
			setResults(locations.filter((location) => venue.test(location.name)))
		} else {
			setResults(locations)
		}
	}

	const getNear = (near) => {
		userInput(near);
	}

	const getResult = (r) => {
		const index = results.indexOf(r);
		setResult({ result: r, index });
	}

	useEffect(() => {
		getData('Chicago, IL')
	}, [])

	useEffect(() => {
		if (locations !== null && locations[0] !== undefined) {
      const lat = locations[0].geocodes.main.latitude
      const lng = locations[0].geocodes.main.longitude
      setCenter({ lat, lng })
    }
	}, [locations])
	

  return (
    <div className="App">
      <Sidebar
        locations={locations}
        getQuery={getQuery}
        getNear={getNear}
        results={results}
        resultClicked={getResult}
			/>
			{dataComplete &&
				<APIProvider apiKey={MAPS_API_KEY}>
					<GoogleMap
						userInput={userInputValue}
						results={results}
						center={center}
						result={result}
					/>
				</APIProvider>
			}
    </div>
  )
}

export default App;
