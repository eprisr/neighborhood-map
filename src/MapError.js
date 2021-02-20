import React from 'react';
import swal from '@sweetalert/with-react';

class MapError extends React.Component {
	state = {
		timeout: null,
		error: null
	}

	componentDidMount = () => {
		let timeout = window.setTimeout(this.showAlert, 5000);
		let error = window.setTimeout(this.showError, 15000)
		this.setState({timeout});
		this.setState({error});
	}

	componentWillUnmount = () => {
		window.clearTimeout(this.state.timeout);
		window.clearTimeout(this.state.error);
	}

	showAlert = () => {
		swal('This is Taking Awhile...');
	}

	showError = () => {
		swal('Error!', 'Connection Timed Out. Try Again.', 'error');
	}

	render = () => {
		return(
			<div>
				Loading...
			</div>
		)
	}
}

export default MapError;
