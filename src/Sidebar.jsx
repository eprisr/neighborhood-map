import React, { useState } from 'react';
import './index.css';
import Search from './Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List } from '@mui/material';

function Sidebar({ locations, getQuery, getNear, results, resultClicked }) {
	const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevMobileState => !prevMobileState);
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
		<div>
			<IconButton
				color="primary"
				aria-label="Open drawer"
				onClick={handleDrawerToggle}
			>
				<MenuIcon />
			</IconButton>
			<nav>
				{/* <Drawer
					container={this.props.container}
					variant="temporary"
					open={this.state.mobileOpen}
					onClose={this.handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile. (-MaterialUI)
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					open
				>
					{drawer}
				</Drawer> */}
			</nav>
		</div>
	)
}

export default Sidebar;
