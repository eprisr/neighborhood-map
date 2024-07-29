import React, { useState } from 'react';
import { Grid, List, ListItem, ListItemButton } from '@mui/material';

function Suggestions({ results, getResult }) {
	const [selectedIndex, setSelectedIndex] = useState(null)
	
	const clickResult = (e, i) => {
		setSelectedIndex(i)
	}

	return (
    <List>
      {results && results.map((r) => (
        <ListItem key={r.fsq_id}>
					<ListItemButton
						selected={selectedIndex === r.fsq_id}
						onClick={(e) => {
							getResult(r);
							clickResult(e, r.fsq_id)
						}}
          >
						<Grid container spacing={2}>
							<Grid item xs={12}>{r.name}</Grid>
						</Grid>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default Suggestions;
