import AppContent from './AppContent'
import { SearchProvider } from './SearchContext'

function App() {
	return (
		<SearchProvider>
			<AppContent />
		</SearchProvider>
	)
}

export default App
