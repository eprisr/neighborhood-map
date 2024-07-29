import React, { useState } from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';

function Suggestions({ results, getResult }) {
	const [selectedIndex, setSelectedIndex] = useState(null)
	
	const clickResult = (e, i) => {
		setSelectedIndex(i)
	}

	return (
    <List>
      {results.map((r) => (
        <ListItem key={r.fsq_id}>
					<ListItemButton
						selected={selectedIndex === r.fsq_id}
						onClick={(e) => {
							getResult(r);
							clickResult(e, r.fsq_id)
						}}
          >
            {r.name}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default Suggestions;
