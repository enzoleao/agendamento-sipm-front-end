import { Routes, Route, Navigate } from 'react-router-dom'
import { useContexts } from './contexts/useContexts'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Agendamento } from './pages/Agendamento'
import { ConsultarHorarios } from './pages/consultarhorarios'
export function Router() {
  const { isAuthenticated } = useContexts()

  const Private = ({ children }: any) => {
    if (!isAuthenticated && window.location.href !== '/login') {
      return <Navigate to="/login" />
    }
    return children
  }
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Agendamento />} />
      <Route path="/consultarhorarios" element={<ConsultarHorarios />} />
    </Routes>
  )
}
