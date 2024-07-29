import React from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';

function Suggestions({ results, getResult }) {
	return (
    <List>
      {results.map((r) => (
        <ListItem key={r.fsq_id}>
					<ListItemButton
          onClick={() => getResult(r)}
          >
            {r.name}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default Suggestions;
