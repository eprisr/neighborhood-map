import React from 'react';
import './index.css';
import Search from './Search';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List } from '@mui/material';

class Sidebar extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		theme: PropTypes.object.isRequired,
	};

	state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

	render() {
		const { classes, theme } = this.props;

		const drawer = (
			<div>
				<div className={classes.toolbar} />
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
			<div className={classes.root}>
				<IconButton
					color="primary"
					aria-label="Open drawer"
					onClick={this.handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
        <nav className={classes.drawer}>
					{/* <Drawer
						container={this.props.container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile. (-MaterialUI)
						}}
					>
						{drawer}
					</Drawer>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
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
