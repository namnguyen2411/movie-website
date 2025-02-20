import CategoryCarousel from 'src/features/movie/components/CategoryCarousel'
import TrendingMovies from 'src/features/movie/components/TrendingMovies'
import NewMoviesByCountry from 'src/features/movie/components/NewMoviesByCountry'

const Home = () => {
  return (
    <>
      <TrendingMovies />
      <CategoryCarousel />
      <NewMoviesByCountry />
    </>
  )
}
export default Home
