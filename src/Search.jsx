import React from 'react';
import Suggestions from './Suggestions';
import PropTypes from 'prop-types';
// import Input from '@material-ui/core/Input';
// import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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

class Search extends React.Component {
	state = {
		query: '',
		city: 'Chicago, IL'
	}

	//Handle input (MaterialUI)
	// handleChange = name => event => {
	//   this.setState({
	//     [name]: event.target.value,
	//   });
	// };

  //Update query to input value
	updateQuery = () => {
		this.setState({
			query: this.search.value
		}, () => {
			if(this.state.query && this.state.query.length > 0) {
				//Give query to App.js
				this.props.getQuery(this.state.query)
			}
		})
	}

	//Update near to input value
	updateNear = (city) => event => {
		this.setState({
			city: event.target.value
		}, (city) => {
			//Give near to App.js
			this.props.getNear(this.state.city)
		})
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				{/* Material UI */}
				<form className={classes.container} noValidate autoComplete="off">
					<TextField
						id="standard-select-city"
						select
						label="Select"
						className={classes.textField}
						style={{margin: 10}}
						error={ false }
						// placeholder="City, State"
						value={this.state.city}
						// onChange={this.handleChange('city')}
						// inputRef={input => this.near = input}
						onChange={this.updateNear('city')}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
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
					style={{margin: 10}}
					error={ false }
          placeholder="Search for Smoothies!"
					inputRef={input => this.search = input}
					type="search"
					onChange={this.updateQuery}
				>
				</TextField>
				<Suggestions
					results={this.props.results}
					resultClicked={this.props.resultClicked}
				/>
			</div>
		)
	}
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Search;
