import { Provider as ReduxProvider } from 'react-redux'
import './styles/global.css'

import { Dashboard } from './pages/Dashboard'
import { store } from './store'

export function App() {
  return (
    <ReduxProvider store={store}>
      <Dashboard />
    </ReduxProvider>
  )
}
