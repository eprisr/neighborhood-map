import React, { useEffect, useState } from 'react';
import Suggestions from './Suggestions';
import PropTypes from 'prop-types';
// import Input from '@material-ui/core/Input';
// import classNames from 'classnames';
import { MenuItem, TextField } from '@mui/material';

const cities = [
	{
		value: 'Chicago, IL',
		label: 'Chicago, IL',
	},{
		value: 'Detroit, MI',
		label: 'Detroit, MI',
	},{
		value: 'Houston, TX',
		label: 'Houston, TX',
	},{
		value: 'Miami, FL',
		label: 'Miami, FL',
	},{
		value: 'New York, NY',
		label: 'New York, NY',
	}
]
function Search() {
	const [query, setQuery] = useState('');
	const [city, setCity] = useState('Chicago, IL');

	//Handle input (MaterialUI)
	// handleChange = name => event => {
	//   this.setState({
	//     [name]: event.target.value,
	//   });
	// };

  //Update query to input value
	const updateQuery = () => {
		setQuery(search.value)
	}
	
	useEffect(() => {
		if (query && query.length > 0) {
			//Give query to App.js
			getQuery(query)
		}
	}, [query]);

	//Update near to input value
	const updateNear = (city) => event => {
		setCity(event.target.value)
	}

	useEffect(() => {
		//Give near to App.js
		getNear(city)
	}, [city])

	return (
		<div>
			{/* Material UI */}
			<form noValidate autoComplete="off">
				<TextField
					id="standard-select-city"
					select
					label="Select"
					error={ false }
					// placeholder="City, State"
					value={city}
					// onChange={this.handleChange('city')}
					// inputRef={input => this.near = input}
					onChange={updateNear('city')}
					helperText="Select a City"
				>
					{cities.map(city => (
						<MenuItem key={city.value} value={city.value}>
							{city.label}
						</MenuItem>
					))}
				</TextField>
			</form>
			<TextField
				error={ false }
				placeholder="Search for Smoothies!"
				inputRef={input => search = input}
				type="search"
				onChange={updateQuery}
			>
			</TextField>
			<Suggestions
				results={results}
				resultClicked={resultClicked}
			/>
		</div>
	)
}

export default Search;
