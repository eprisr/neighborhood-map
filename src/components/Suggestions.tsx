import { MouseEvent, useContext, useEffect, useState } from 'react'
import { Grid, List, ListItem, ListItemButton } from '@mui/material'
import { SearchContext } from '../SearchContext'
import escapeStringRegexp from 'escape-string-regexp'

function Suggestions() {
	const { results, result, setResult, userQuery } = useContext(SearchContext)
	const [filteredResults, setFilteredResults] = useState<any[]>([])
	const [selectedIndex, setSelectedIndex] = useState<string | null>(null)

	const filterResults = () => {
		if (userQuery !== '' && userQuery !== undefined) {
			const venue = new RegExp(escapeStringRegexp(userQuery), 'i')
			const filteredLocations = results.filter((result) =>
				venue.test(result.name),
			)
			return filteredLocations
		} else {
			return results
		}
	}

	const clickResult = (e: MouseEvent, id: string) => {
		setSelectedIndex(id)
	}

	const getResult = (r: string) => {
		setResult({ result: r })
	}

	useEffect(() => {
		setFilteredResults(filterResults())
	}, [userQuery, results])

	useEffect(() => {
		setSelectedIndex(result?.result?.fsq_place_id || null)
	}, [result])

	return (
		<List>
			{filteredResults &&
				filteredResults.map((r) => (
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
