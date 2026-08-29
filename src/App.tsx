import { useState, useEffect } from 'react'
import escapeRegExp from 'escape-string-regexp'
import Sidebar from './components/Sidebar'
import './App.css'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import Swal from 'sweetalert2'
import MapsProvider from './MapsProvider'
import { Locations } from './types'

function App() {
	const [locations, setLocations] = useState<Locations[]>([])
	const [results, setResults] = useState<any[]>([])
	const [result, setResult] = useState<object>({})
	const [userInputValue, setUserInputValue] = useState<{ near: string }>({
		near: '',
	})
	const [resultsError, setResultsError] = useState<string>('')
	const [center, setCenter] = useState<{ lat: number; lng: number }>({
		lat: 41.85003,
		lng: -87.65005,
	})
	const [dataComplete, setDataComplete] = useState<boolean>(false)

	async function getData(near: string) {
		if (dataComplete === true) setDataComplete(false)
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

	const userInput = (near: string) => {
		setUserInputValue({ near })
		getData(near)
	}

	const getQuery = (query: string) => {
		if (query !== '' && query !== undefined) {
			const venue = new RegExp(escapeRegExp(query), 'i')
			const filteredLocations = locations.filter((location) =>
				venue.test(location.name),
			)
			setResults(filteredLocations)
		} else {
			setResults(locations)
		}
	}

	const getNear = (near: string) => {
		userInput(near)
	}

	const getResult = (r: string) => {
		const index = results.indexOf(r)
		setResult({ result: r, index })
	}

	useEffect(() => {
		getData('Chicago, IL')
	}, [])

	useEffect(() => {
		if (locations !== null && locations[0] !== undefined) {
			const lat = locations[0].latitude
			const lng = locations[0].longitude
			setCenter({ lat, lng })
		}
	}, [locations])

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar
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
					<MapsProvider results={results} center={center} result={result} />
				</Box>
			)}
		</Box>
	)
}

export default App
