import { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { SearchContext } from '../SearchContext'

export async function useData(near: string) {
	const {
		setLocations,
		setResults,
		dataComplete,
		setDataComplete,
		resultsError,
		setResultsError,
	} = useContext(SearchContext)

	if (dataComplete === true) setDataComplete(false)
	if (resultsError !== '') setResultsError('')

	fetch(`/api/places?near=${near}`)
		.then((res) => {
			if (res.status === 200) return res.json()
		})
		.then((res) => {
			if (res === undefined) {
				setResultsError(
					'Please enter a valid location. (ie Chicago,IL or London)',
				)
				return
			}

			setLocations(res.results)
			setResults(res.results)
			setDataComplete(true)
		})
		.catch((err) => {
			console.log(err)
			Swal.fire({
				title: 'ERROR!',
				text: 'Unable to Retrieve Data.',
				icon: 'error',
				showCloseButton: true,
			})
		})
}
