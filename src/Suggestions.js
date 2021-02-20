import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Suggestions extends React.Component {
	render() {

		//Map over results array
		//Return list item
		const options = this.props.results.map(r => (
		<ListItem
			key={r.id}
			button={true}
			onClick={() => this.props.resultClicked(r)}
		>
			{r.name}
		</ListItem>
		))

		return (
			<List>
				{options}
			</List>
		)
	}
}

export default Suggestions;
