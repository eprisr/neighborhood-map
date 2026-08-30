import { useState, useEffect, useContext } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import MapsProvider from './MapsProvider'
import { SearchContext } from './SearchContext'

function AppContent() {
	const { locations, results, dataComplete } = useContext(SearchContext)

	const [center, setCenter] = useState<{ lat: number; lng: number }>({
		lat: 41.85003,
		lng: -87.65005,
	})

	useEffect(() => {
		if (locations !== null && locations[0] !== undefined) {
			const lat = locations[0].latitude
			const lng = locations[0].longitude
			setCenter({ lat, lng })
		}
	}, [locations])

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar />
			{dataComplete && (
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						width: { md: `calc(100vw - 240px)` },
						height: '100vh',
					}}>
					<Toolbar sx={{ display: { md: 'none' } }} />
					<MapsProvider results={results} center={center} result={result} />
				</Box>
			)}
		</Box>
	)
}

export default AppContent
