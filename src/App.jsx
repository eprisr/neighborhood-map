import { useState, useEffect } from 'react'
import { APIProvider } from '@vis.gl/react-google-maps'
import escapeRegExp from 'escape-string-regexp'
import Sidebar from './Sidebar'
import GoogleMap from './Map'
import './App.css'
import { Box, CssBaseline, Toolbar } from '@mui/material'

const MAPS_API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY
const FOURSQUARE_API_KEY = import.meta.env.FOURSQUARE_API_KEY

function App() {
	const [locations, setLocations] = useState(null)
	const [results, setResults] = useState([])
	const [result, setResult] = useState({})
	const [userInputValue, setUserInputValue] = useState({ near: '' })
	const [resultsError, setResultsError] = useState('')
	const [center, setCenter] = useState({ lat: 41.85003, lng: -87.65005 })
	const [dataComplete, setDataComplete] = useState(false)

	async function getData(near) {
		if (setDataComplete === true) setDataComplete(false)
		if (resultsError !== '') setResultsError('')

		const places = await getFsqPlaces({
			setResultsError,
			setLocations,
			setResults,
			setDataComplete,
		})
	}

	const userInput = (near) => {
		setUserInputValue({ near })
		getData(near)
	}

	const getQuery = (query) => {
		if (query !== '' && query !== undefined) {
			const venue = new RegExp(escapeRegExp(query), 'i')
			setResults(locations.filter((location) => venue.test(location.name)))
		} else {
			setResults(locations)
		}
	}

	const getNear = (near) => {
		userInput(near)
	}

	const getResult = (r) => {
		const index = results.indexOf(r)
		setResult({ result: r, index })
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
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar
				locations={locations}
				getQuery={getQuery}
				getNear={getNear}
				results={results}
				resultsError={resultsError}
				getResult={getResult}
			/>
			{dataComplete && (
				<APIProvider
					apiKey={MAPS_API_KEY}
					onLoad={() => console.log('Maps API has loaded.')}>
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							width: { md: `calc(100vw - 240px)` },
							height: '100vh',
						}}>
						<Toolbar sx={{ display: { md: 'none' } }} />
						<GoogleMap
							userInput={userInputValue}
							results={results}
							center={center}
							result={result}
						/>
					</Box>
				</APIProvider>
			)}
		</Box>
	)
}

export default App
