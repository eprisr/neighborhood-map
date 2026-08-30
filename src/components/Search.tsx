import { useContext, useState } from 'react'
import { Box, TextField } from '@mui/material'
import useDebounce from '../utils/useDebounce'
import Suggestions from './Suggestions'
import { SearchContext } from '../SearchContext'

function Search() {
	const { resultsError, setUserCity, setUserQuery } = useContext(SearchContext)
	const [query, setQuery] = useState<string>('smoothie')
	const [city, setCity] = useState<string>('')

	const updateQuery = () => {
		setUserQuery(query)
	}

	const updateNear = () => {
		setUserCity(city)
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
			<Suggestions />
		</div>
	)
}

export default Search
