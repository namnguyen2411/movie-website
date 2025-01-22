import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Heart, Info, Play } from 'lucide-react'
import clsx from 'clsx'
import store from 'src/redux/store'
import { TRENDING_MOVIES } from 'src/constants/trending'
import { movieApi } from '../../service/movieService'
import { MovieType } from '../../types/movie.type'

const fetchmovies = async () => {
  const result = await Promise.all(
    TRENDING_MOVIES.map((slug) => store.dispatch(movieApi.endpoints.getMovieDetail.initiate(slug)).unwrap())
  )
  return result.map((res) => res.movie)
}

const TrendingMovies = () => {
  const [movieList, setMovieList] = useState<MovieType[]>([])
  const [thumbList, setThumbList] = useState<string[]>([])
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchmovies()
      setMovieList(results)

      const thumbUrls = results.map((item) => item.thumb_url)
      setThumbList(thumbUrls)
    }

    void fetchData()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Set height of empty div to match the height of the movie content
  useEffect(() => {
    if (thumbList.length > 0 && windowWidth >= 768) {
      const elementHeight = document.getElementById('movie-content')!.offsetHeight
      document.getElementById('empty-div')!.style.height = `${elementHeight + 100 - 104}px`
    }
  }, [thumbList, windowWidth])

  const currentRecommend = movieList[currentThumbIndex]
  if (!currentRecommend) return null

  return (
    <>
      <div
        className={clsx(
          'inset-0 flex min-h-[300px] flex-col overflow-hidden text-foreground transition-all duration-300',
          'sm:h-[420px]',
          'md:absolute md:h-[700px]',
          'xl:h-[760px]'
        )}
      >
        {/* Background Image - Only display on 1280px+++ screen */}
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat xl:block"
          style={{
            backgroundImage: `
        radial-gradient(rgba(0, 0, 0, 0) 20%, rgba(25, 27, 36, 1) 100%),
        url(${thumbList[currentThumbIndex]})
      `
          }}
        />
        {/* Movie Content */}
        <div
          className={clsx(
            'flex h-auto min-h-[240px] flex-col bg-cover bg-center bg-no-repeat',
            'sm:aspect-[16/9] sm:max-h-[320px] sm:gap-2.5',
            'md:max-h-[600px] md:min-h-[450px] md:gap-3.5',
            'xl:min-h-[660px] xl:!bg-none'
          )}
          id="movie-content"
          style={{
            backgroundImage: `
      radial-gradient(circle at top, rgba(0, 0, 0, 0) 20%, rgba(25, 27, 36, 1) 100%),
      url(${thumbList[currentThumbIndex]})
    `
          }}
        >
          {/* Title */}
          <Link
            to={`phim/${currentRecommend.slug}`}
            className={clsx(
              'mt-auto translate-y-1 bg-gradient-to-b from-main-bg/5 to-main-bg/40 pb-2 pl-7 text-center',
              'sm:w-fit sm:translate-y-0 sm:from-transparent sm:to-transparent sm:pb-0 sm:text-left',
              'xl:pb-5'
            )}
          >
            <h1 className="text-[22px] font-bold sm:text-[26px] lg:text-3xl 2xl:text-5xl">{currentRecommend.name}</h1>
          </Link>

          {/* Info */}
          <div
            className={clsx(
              'flex translate-y-1 items-center justify-center space-x-2 bg-gradient-to-b from-main-bg/40 to-main-bg/70 pl-0 text-xs',
              'sm:translate-y-0 sm:justify-start sm:from-transparent sm:to-transparent sm:pl-7',
              '2xl:text-sm'
            )}
          >
            <div className="rounded-md border border-yellow px-2 py-1 font-medium text-foreground">
              <span className="font-normal text-yellow">IMDb</span> 6.3
            </div>
            <span className="rounded-md border border-white px-2 py-1">{currentRecommend.year}</span>
            <span className="rounded-md border border-white px-2 py-1">{currentRecommend.episode_current}</span>
          </div>

          {/* Category Tags */}
          <div
            className={clsx(
              'hidden translate-y-1 flex-wrap gap-2 bg-gradient-to-b from-transparent to-sub-bg pl-7 text-xs',
              'sm:flex sm:translate-y-0',
              'md:bg-transparent md:from-transparent md:to-transparent',
              '2xl:text-sm'
            )}
          >
            {currentRecommend.category.map((c) => (
              <Link
                to={`the-loai/${c.slug}`}
                key={c.slug}
                className="rounded-md bg-white/20 px-2 py-1 hover:text-yellow"
              >
                <span>{c.name}</span>
              </Link>
            ))}
          </div>

          {/* Description */}
          <div
            className={clsx(
              'z-10 hidden w-[60%] bg-gradient-to-b from-transparent to-sub-bg pl-7',
              'md:block md:py-2',
              'xl:w-[50%] xl:!bg-none xl:py-3',
              '2xl:w-[45%] 2xl:py-4'
            )}
          >
            <p className="text-sm md:!line-clamp-3">{currentRecommend.content}</p>
          </div>
        </div>

        {/* Actions & Carousel */}
        <div
          className={clsx(
            'z-10 !ml-0 flex h-[60px] w-full translate-y-1 items-center justify-between bg-gradient-to-b from-main-bg/70 to-main-bg pl-7 pr-5 xl:pr-7',
            'sm:h-[100px] sm:translate-y-0 sm:bg-sub-bg sm:from-transparent sm:to-transparent',
            'xl:bg-transparent'
          )}
        >
          {/* Actions */}
          <div className="hidden items-center space-x-8 sm:flex 2xl:space-x-10">
            {/* Play Button */}
            <Link
              to={`/xem-phim/${currentRecommend.slug}`}
              className="relative flex aspect-square w-[60px] items-center justify-center rounded-full !bg-yellow transition-all duration-200 hover:shadow-[0_0_10px_4px] hover:shadow-yellow/50 lg:w-[70px]"
            >
              <Play size={'36px'} className="fill-black stroke-black" />
            </Link>

            {/* Favorite & Info */}
            <div className="flex h-[48px] items-center justify-around overflow-hidden rounded-full border border-white/20 hover:border-white">
              {/* Favorite Button */}
              <Link to="#" className="group flex h-[100%] w-[68px] items-center justify-center hover:bg-white/5">
                <Heart
                  size={20}
                  className="fill-white stroke-white transition-all duration-200 group-hover:fill-yellow group-hover:stroke-yellow"
                />
              </Link>

              <div className="flex h-full w-[1px] items-center justify-center bg-white/30" />

              {/* Info Button */}
              <Link
                to={`/phim/${currentRecommend.slug}`}
                className="group flex h-[100%] w-[68px] items-center justify-center hover:bg-white/5"
              >
                <Info size={20} className="stroke-white transition-all duration-200 group-hover:stroke-yellow" />
              </Link>
            </div>
          </div>

          {/* Carousel */}
          <div className="mx-auto flex items-center justify-center gap-4 sm:mx-0">
            {thumbList.map((thumb, index) => (
              <button
                key={index}
                onClick={() => setCurrentThumbIndex(index)}
                className={clsx(
                  'h-[26px] w-[40px] overflow-hidden rounded-md border-2 hover:border-white',
                  'sm:h-[30px] sm:w-[45px]',
                  'lg:h-[40px] lg:w-[60px]',
                  '2xl:h-[40px] 2xl:w-[80px]',
                  currentThumbIndex === index ? 'border-white' : 'border-transparent'
                )}
              >
                <img src={thumb} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty div for spacing */}
      <div id="empty-div" className="hidden h-auto bg-transparent md:block" />
    </>
  )
}

export default TrendingMovies
