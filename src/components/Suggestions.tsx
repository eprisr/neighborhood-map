import { MouseEvent, useContext, useState } from 'react'
import { Grid, List, ListItem, ListItemButton } from '@mui/material'
import { SearchContext } from '../SearchContext'

function Suggestions() {
	const { results, setResult } = useContext(SearchContext)
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	const clickResult = (e: MouseEvent, i: number) => {
		setSelectedIndex(i)
	}

	const getResult = (r: string) => {
		const index = results.indexOf(r)
		setResult({ result: r, index })
	}

	return (
		<List>
			{results &&
				results.map((r) => (
					<ListItem key={r.fsq_place_id}>
						<ListItemButton
							selected={selectedIndex === r.fsq_place_id}
							onClick={(e) => {
								getResult(r)
								clickResult(e, r.fsq_place_id)
							}}>
							<Grid container spacing={2}>
								<Grid size={12}>{r.name}</Grid>
							</Grid>
						</ListItemButton>
					</ListItem>
				))}
		</List>
	)
}

export default Suggestions
