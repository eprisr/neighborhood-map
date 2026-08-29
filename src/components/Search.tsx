import { useState } from 'react'
import useDebounce from '../utils/useDebounce'
import Suggestions from './Suggestions'
import { Box, TextField } from '@mui/material'

interface SearchProps {
	getQuery: (query: string) => void
	getNear: (near: string) => void
	results: any[]
	resultsError: string
	getResult: (r: string) => void
}

function Search({
	getQuery,
	getNear,
	results,
	resultsError,
	getResult,
}: SearchProps) {
	const [query, setQuery] = useState<string>('')
	const [city, setCity] = useState<string>('')

	const updateQuery = () => {
		getQuery(query)
	}

	const updateNear = () => {
		getNear(city)
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
			<Suggestions results={results} getResult={getResult} />
		</div>
	)
}

export default Search
