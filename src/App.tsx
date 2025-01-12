import { BrowserRouter, Route, Routes } from 'react-router'
// Layout
import MainLayout from 'src/components/Layout/MainLayout'
// Pages
import Home from 'src/pages/Home'
import MovieDetail from 'src/pages/MovieDetail'
import MoviesPage from 'src/pages/MoviesPage'
import NotFound from 'src/pages/NotFound'
import { ROUTES } from './constants/routes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetail />} />
          <Route path={ROUTES.BROWSE} element={<MoviesPage />} />
          <Route path={ROUTES.SERIES} element={<MoviesPage />} />
          <Route path={ROUTES.MOVIES} element={<MoviesPage />} />
          <Route path={ROUTES.COUNTRY} element={<MoviesPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
