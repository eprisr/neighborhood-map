import { useContext, useState } from 'react'
import escapeRegExp from 'escape-string-regexp'
import { Box, TextField } from '@mui/material'
import useDebounce from '../utils/useDebounce'
import Suggestions from './Suggestions'
import { SearchContext } from '../SearchContext'
import { useData } from '../utils/useData'

function Search() {
	const { locations, results, resultsError } = useContext(SearchContext)
	const [query, setQuery] = useState<string>('')
	const [city, setCity] = useState<string>('')
	const [userInputValue, setUserInputValue] = useState<{ near: string }>({
		near: '',
	})

	const userInput = (near: string) => {
		setUserInputValue({ near })
	}

	// useData(near)

	const updateQuery = () => {
		if (query !== '' && query !== undefined) {
			const venue = new RegExp(escapeRegExp(query), 'i')
			const filteredLocations = locations.filter((location) =>
				venue.test(location.name),
			)
			// setResults(filteredLocations)
		} else {
			// setResults(locations)
		}
	}

	const updateNear = () => {
		userInput(city)
	}

	const debouncedQuery = useDebounce(updateQuery)
	const debouncedCity = useDebounce(updateNear)

	return (
		<div>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				sx={{
					p: 2,
				}}>
				<TextField
					error={resultsError !== ''}
					placeholder="City, ST"
					type="search"
					onChange={(e) => {
						debouncedCity()
						setCity(e.target.value)
					}}
					fullWidth
					helperText={resultsError}
					sx={{
						marginBottom: 1,
					}}
				/>
				<TextField
					error={false}
					placeholder="Find Your Smoothie"
					type="search"
					onChange={(e) => {
						debouncedQuery()
						setQuery(e.target.value)
					}}
					fullWidth
				/>
			</Box>
			<Suggestions results={results} />
		</div>
	)
}

export default Search
