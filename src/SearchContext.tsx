import {
	createContext,
	Dispatch,
	ReactElement,
	SetStateAction,
	useState,
} from 'react'
import { Locations } from './types'
import { useData } from './utils/useData'

interface SearchResults {
	locations: Locations[]
	results: any[]
	dataComplete: boolean
	resultsError: string
}

const SearchContext = createContext<SearchResults>({
	locations: [],
	results: [],
	dataComplete: false,
	resultsError: '',
})

interface ProviderProps {
	children: ReactElement
}

function SearchProvider({ children }: ProviderProps) {
	const { data, locations, results, dataComplete, resultsError } = useData(
		'/api/places?near="Chicago,IL"',
	)

	return (
		<SearchContext
			value={{
				locations: locations,
				results: results,
				dataComplete: dataComplete,
				resultsError: resultsError,
			}}>
			{children}
		</SearchContext>
	)
}

export { SearchProvider, SearchContext }
