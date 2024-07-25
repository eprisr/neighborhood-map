import React from 'react';
import './index.css';
import Search from './Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List } from '@mui/material';

class Sidebar extends React.Component {
	state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

	render() {
		const drawer = (
			<div>
        <List>
          <h1 style={{ marginLeft: 10 }}>SEARCH</h1>

          <Search
            locations={this.props.locations}
            getQuery={this.props.getQuery}
            getNear={this.props.getNear}
            results={this.props.results}
            resultClicked={this.props.resultClicked}
          />
        </List>
			</div>
		);

		return (
			<div>
				<IconButton
					color="primary"
					aria-label="Open drawer"
					onClick={this.handleDrawerToggle}
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
}

export default Sidebar;
