import React from 'react';
import Swal from 'sweetalert2';

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
		Swal({
			text: 'This is Taking Awhile...'
		});
	}

	showError = () => {
		Swal({
			title: 'Error!',
			text: 'Connection Timed Out. Try Again.',
			icon: 'error'
		});
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
