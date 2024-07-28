import React, { useEffect, useRef, useState } from 'react';
import useDebounce from './utils/useDebounce';
import Suggestions from './Suggestions';
import { TextField } from '@mui/material';

function Search({ locations, getQuery, getNear, results, resultClicked }) {
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
			<TextField
				error={false}
				placeholder='City, ST'
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
			>
			</TextField>
			<Suggestions
				results={results}
				// resultClicked={resultClicked}
			/>
		</div>
	)
}

export default Search;
