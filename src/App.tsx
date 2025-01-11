import { BrowserRouter, Route, Routes } from 'react-router'
// Layout
import MainLayout from 'src/components/Layout/MainLayout'
// Pages
import Home from 'src/pages/Home'
import MovieDetail from 'src/pages/MovieDetail'
import MoviesPage from 'src/pages/MoviesPage'
import NotFound from 'src/pages/NotFound'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/phim/:id" element={<MovieDetail />} />
            <Route path="/duyet-tim" element={<MoviesPage />} />
            <Route path="/phim-bo" element={<MoviesPage />} />
            <Route path="/phim-le" element={<MoviesPage />} />
            <Route path="/quoc-gia/:country" element={<MoviesPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
