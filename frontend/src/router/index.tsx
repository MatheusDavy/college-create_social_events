// React Router Dom
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

// Pages
import LoginPage from '../pages/auth/login'
import HomePage from '../pages/app/home'
import Header from '../components/Header'
import EventDescriptionPage from '../pages/app/eventos-descricao'
import CriarEventosPage from '../pages/app/criar-eventos'
import MeusEventosCriadosPage from '../pages/app/meus-eventos-criados'
import EditarEventosPage from '../pages/app/editar-evento'
import EstatisticaPage from '../pages/app/estatisticas'

export default function MainRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<LoginPage />} path='/auth/login' />

      {/* Private Route */}
      <Route element={<ProtectRoute />}>
        <Route element={<HomePage />} path='/' />
        <Route element={<EventDescriptionPage />} path='/evento-descricao/:id' />
        <Route element={<CriarEventosPage />} path='/criar-eventos/'/>
        <Route element={<EditarEventosPage />} path='/editar-evento/:id' />
        <Route element={<MeusEventosCriadosPage />} path='/meus-eventos-criados' />
        <Route element={<EstatisticaPage />} path='/estatistica' />
      </Route>

      {/* 404 */}
      <Route element={<Navigate to={'/'} />} path='*' />
    </Routes>
  )
}

const ProtectRoute = () => {
  const token = localStorage.getItem('token')

  return token ? <>
    <Header /><Outlet /></> : <Navigate to={`/auth/login`} />
}