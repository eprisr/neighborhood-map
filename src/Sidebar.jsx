import React, { useState } from 'react';
import './index.css';
import Search from './Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, CssBaseline, Drawer, IconButton, List } from '@mui/material';

const drawerWidth = 240;

function Sidebar({ locations, getQuery, getNear, results, resultClicked }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(true);
	}

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	}

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
  };

	const drawer = (
		<div>
			<List>
				<h1>SEARCH</h1>

				<Search
					locations={locations}
					getQuery={getQuery}
					getNear={getNear}
					results={results}
					resultClicked={resultClicked}
				/>
			</List>
		</div>
	)

	return (
		<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: {sm: 0 } }} aria-label="search">
			<IconButton
				color="primary"
				aria-label="Open drawer"
				onClick={handleDrawerToggle}
				sx={{ mr: 20, display: { sm: 'none' } }}
			>
				<MenuIcon />
			</IconButton>
			<Box>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onTransitionEnd={handleDrawerTransitionEnd}
					onClose={handleDrawerClose}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	)
}

export default Sidebar;
