import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Locations } from '../types'

export function useData(url: string) {
	const [locations, setLocations] = useState<Locations[]>([])
	const [results, setResults] = useState<any[]>([])
	const [dataComplete, setDataComplete] = useState<boolean>(false)
	const [resultsError, setResultsError] = useState<string>('')

	const [data, setData] = useState(null)

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
					setData(res.results)
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

	return { data, locations, results, dataComplete, resultsError }
}
