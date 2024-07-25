import React from 'react';
import { List, ListItem } from '@mui/material';

function Suggestions({ results, resultsClicked }) {
	//Map over results array
	//Return list item
	const options = results.map(r => (
	<ListItem
		key={r.id}
		button={true}
		onClick={() => resultClicked(r)}
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

export default Suggestions;
