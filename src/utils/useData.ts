import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Locations } from '../types'
import { SearchContext } from '../SearchContext'

export function useData(url: string) {
	const [locations, setLocations] = useState<Locations[]>([])
	const [results, setResults] = useState<any[]>([])
	const [dataComplete, setDataComplete] = useState<boolean>(false)
	const [resultsError, setResultsError] = useState<string>('')

	useEffect(() => {
		let ignore = false
		if (dataComplete === true) setDataComplete(false)
		if (resultsError !== '') setResultsError('')

		fetch(url)
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

				if (!ignore) {
					setLocations(res.results)
					setResults(res.results)
					setDataComplete(true)
				}
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

		return () => {
			ignore = true
		}
	}, [url])

	return { locations, results, dataComplete, resultsError }
}
