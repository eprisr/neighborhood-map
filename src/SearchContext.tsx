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
	userInputValue: string
	setUserInputValue: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<SearchResults>({
	locations: [],
	results: [],
	result: {},
	setResult: useState,
	dataComplete: false,
	resultsError: '',
	userInputValue: '',
	setUserInputValue: useState,
})

interface ProviderProps {
	children: ReactElement
}

function SearchProvider({ children }: ProviderProps) {
	const [userInputValue, setUserInputValue] = useState<string>('Chicago, IL')

	const { locations, results, dataComplete, resultsError } = useData(
		`/api/places?near=${userInputValue}`,
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
				userInputValue: userInputValue,
				setUserInputValue: setUserInputValue,
			}}>
			{children}
		</SearchContext>
	)
}

export { SearchProvider, SearchContext }
