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
	userCity: string
	setUserCity: Dispatch<SetStateAction<string>>
	userQuery: string
	setUserQuery: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<SearchResults>({
	locations: [],
	results: [],
	result: {},
	setResult: useState,
	dataComplete: false,
	resultsError: '',
	userCity: 'Chicago, IL',
	setUserCity: useState,
	userQuery: 'smoothie',
	setUserQuery: useState,
})

interface ProviderProps {
	children: ReactElement
}

function SearchProvider({ children }: ProviderProps) {
	const [userCity, setUserCity] = useState<string>('Chicago, IL')
	const [userQuery, setUserQuery] = useState<string>('')

	const { locations, results, dataComplete, resultsError } = useData(
		`/api/places?query=${userQuery}&near=${userCity}`,
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
				userCity: userCity,
				setUserCity: setUserCity,
				userQuery: userQuery,
				setUserQuery: setUserQuery,
			}}>
			{children}
		</SearchContext>
	)
}

export { SearchProvider, SearchContext }
