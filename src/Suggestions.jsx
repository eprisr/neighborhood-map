import React from 'react';
import { List, ListItemButton } from '@mui/material';

function Suggestions({ results, resultsClicked }) {
	return (
		<List>
			{results.map(r => (
				<ListItemButton
					key={r.fsq_id}
					onClick={() => resultClicked(r)}
				>
					{r.name}
				</ListItemButton>
			))}
		</List>
	)
}

export default Suggestions;
