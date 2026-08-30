import {
	createContext,
	Dispatch,
	ReactElement,
	SetStateAction,
	useState,
} from 'react'
import { Locations } from './types'

interface SearchResults {
	locations: Locations[]
	setLocations: Dispatch<SetStateAction<Locations[]>>
	results: any[]
	setResults: Dispatch<SetStateAction<any[]>>
	dataComplete: boolean
	setDataComplete: Dispatch<SetStateAction<boolean>>
	resultsError: string
	setResultsError: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<SearchResults>({
	locations: [],
	setLocations: useState,
	results: [],
	setResults: useState,
	dataComplete: false,
	setDataComplete: useState,
	resultsError: '',
	setResultsError: useState,
})

interface ProviderProps {
	children: ReactElement
}

function SearchProvider({ children }: ProviderProps) {
	const [locations, setLocations] = useState<Locations[]>([])
	const [results, setResults] = useState<any[]>([])
	const [dataComplete, setDataComplete] = useState<boolean>(false)
	const [resultsError, setResultsError] = useState<string>('')

	return (
		<SearchContext
			value={{
				locations: locations,
				setLocations,
				results,
				setResults,
				dataComplete,
				setDataComplete,
				resultsError,
				setResultsError,
			}}>
			{children}
		</SearchContext>
	)
}

export { SearchProvider, SearchContext }
