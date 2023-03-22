import { Router } from './router'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider, useContexts } from './contexts/useContexts'
export default function App() {
  const { isLoading } = useContexts()
  return (
    <BrowserRouter>
      <ContextProvider>
        {isLoading ? <h1>Carregando</h1> : <Router />}
      </ContextProvider>
    </BrowserRouter>
  )
}
