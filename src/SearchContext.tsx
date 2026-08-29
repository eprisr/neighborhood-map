import { createContext } from 'react'
import { Locations } from './types'

interface SearchResults {
	locations: Locations[]
}

const SearchContext = createContext<SearchResults>({ locations: [] })

export default SearchContext
