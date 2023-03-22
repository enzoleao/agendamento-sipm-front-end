import { Routes, Route, Navigate } from 'react-router-dom'
import { useContexts } from './contexts/useContexts'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
export function Router() {
  const { isAuthenticated } = useContexts()

  const Private = ({ children }: any) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
    return children
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
