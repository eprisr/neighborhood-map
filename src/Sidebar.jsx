import React, { useState } from 'react';
import './index.css';
import Search from './Search';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Drawer, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { Close, HelpOutline } from '@mui/icons-material';

const drawerWidth = {
	xs: '100%',
	md: '30%'
}

const drawerHeight = {
	xs: '80%',
	md: '100%'
}

function Sidebar({ getQuery, getNear, results, resultsError, getResult }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const closeDrawer = () => {
		setIsClosing(true);
		setMobileOpen(false);
	}

	const endDrawerTransition = () => {
		setIsClosing(false);
	}

	const toggleDrawer = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};
	
	const drawer = (
		<div>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Typography variant='h5' component='h1'>Search</Typography>
				<Stack direction='row' spacing={1}>
					<Tooltip
						arrow
						placement="top-end"
						title="Search for smoothies near you by typing in your location (ie Chicago, IL). You can also filter your search by the name of store location."
					>
						<IconButton aria-label="Help">
							<HelpOutline />
						</IconButton>
					</Tooltip>
					<IconButton sx={{ display: { md: 'none' } }} aria-label="Close search" onClick={() => closeDrawer()}>
						<Close />
					</IconButton>
				</Stack>
			</Toolbar>
			<Search
				// locations={locations}
				getQuery={getQuery}
				getNear={getNear}
				results={results}
				resultsError={resultsError}
				getResult={getResult}
			/>
		</div>
	)

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					display: { md: 'none'}
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box sx={{ width: { md: drawerWidth.md }, flexShrink: { md: 0 } }} aria-label="search">
				<Drawer
					anchor="top"
					variant="temporary"
					open={mobileOpen}
					onTransitionEnd={endDrawerTransition}
					onClose={closeDrawer}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: drawerHeight },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', md: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: drawerHeight },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	)
}

export default Sidebar;
