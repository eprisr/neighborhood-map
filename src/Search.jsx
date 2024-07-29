import React, { useEffect, useRef, useState } from 'react';
import useDebounce from './utils/useDebounce';
import Suggestions from './Suggestions';
import { Box, TextField } from '@mui/material';

function Search({ locations, getQuery, getNear, results, getResult }) {
	const [query, setQuery] = useState('');
	const [city, setCity] = useState('');

	const updateQuery = () => {
		getQuery(query);
	}

	const updateNear = () => {
		getNear(city);
	}

	const debouncedQuery = useDebounce(updateQuery)
	const debouncedCity = useDebounce(updateNear)

	return (
		<div>
			<Box
				component="form"
				noValidate
				autoComplete='off'
			>
				<TextField
					error={false}
					placeholder='City, ST'
					type="search"
					onChange={(e) => {
						debouncedCity();
						setCity(e.target.value)
					}}
				/>
				<TextField
					error={ false }
					placeholder="Find Your Smoothie"
					type="search"
					onChange={(e) => {
						debouncedQuery();
						setQuery(e.target.value)
					}}
				/>
			</Box>
			<Suggestions
				results={results}
				getResult={getResult}
			/>
		</div>
	)
}

export default Search;
