import { useState, useEffect } from 'react'
import escapeRegExp from 'escape-string-regexp'
import Sidebar from './components/Sidebar'
import GoogleMap from './components/Map'
import './App.css'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import Swal from 'sweetalert2'
import MapsProvider from './MapsProvider'

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

		fetch(`/api/places?near=${near}`)
			.then((res) => {
				if (res.status === 200) return res.json()
			})
			.then((res) => {
				if (res === undefined) {
					setResultsError(
						'Please enter a valid location. (ie Chicago,IL or London)',
					)
					return
				}

				setLocations(res.results)
				setResults(res.results)
				setDataComplete(true)
			})
			.catch((err) => {
				console.log(err)
				Swal.fire({
					title: 'ERROR!',
					text: 'Unable to Retrieve Data.',
					icon: 'error',
					showCloseButton: true,
				})
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
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						width: { md: `calc(100vw - 240px)` },
						height: '100vh',
					}}>
					<Toolbar sx={{ display: { md: 'none' } }} />
					<MapsProvider
						userInputValue={userInputValue}
						results={results}
						center={center}
						result={result}
					/>
				</Box>
			)}
		</Box>
	)
}

export default App
