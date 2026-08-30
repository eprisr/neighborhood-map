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
	result: {
		result?: {
			fsq_place_id: string
		}
	}
	setResult: Dispatch<SetStateAction<object>>
	dataComplete: boolean
	resultsError: string
}

const SearchContext = createContext<SearchResults>({
	locations: [],
	results: [],
	result: {},
	setResult: useState,
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

	const [result, setResult] = useState<object>({})

	return (
		<SearchContext
			value={{
				locations: locations,
				results: results,
				result: result,
				setResult: setResult,
				dataComplete: dataComplete,
				resultsError: resultsError,
			}}>
			{children}
		</SearchContext>
	)
}

export { SearchProvider, SearchContext }
