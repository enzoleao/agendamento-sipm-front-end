import { Routes, Route } from 'react-router-dom'

import { Login } from './pages/Login'
import { Agendamento } from './pages/Agendamento'
import { ConsultarHorarios } from './pages/consultarhorarios'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Agendamento />} />
      <Route path="/consultarhorarios" element={<ConsultarHorarios />} />
      <Route path="*" element={<p>Page not found: 404</p>} />
    </Routes>
  )
}
