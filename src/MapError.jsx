import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function MapError() {
	const [timeout, setTimeout] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		let timeout = window.setTimeout(showAlert, 5000);
		let error = window.setTimeout(showError, 15000)
		setState({timeout});
		setState({error});
	})

	componentWillUnmount = () => {
		window.clearTimeout(this.state.timeout);
		window.clearTimeout(this.state.error);
	}

	const showAlert = () => {
		Swal({
			text: 'This is Taking Awhile...'
		});
	}

	const showError = () => {
		Swal({
			title: 'Error!',
			text: 'Connection Timed Out. Try Again.',
			icon: 'error'
		});
	}

	return(
		<div>
			Loading...
		</div>
	)
}

export default MapError;
