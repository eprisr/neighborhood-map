import { MouseEvent, useState } from 'react'
import { Grid, List, ListItem, ListItemButton } from '@mui/material'

interface SuggesttionsProps {
	results: any[]
	getResult: (r: any) => void
}

function Suggestions({ results, getResult }: SuggesttionsProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	const clickResult = (e: MouseEvent, i: number) => {
		setSelectedIndex(i)
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
