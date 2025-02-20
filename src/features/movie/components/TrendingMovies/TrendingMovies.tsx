import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Heart, Info, Play } from 'lucide-react'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import Fade from 'embla-carousel-fade'
import store from 'src/redux/store'
import { TRENDING_MOVIES } from 'src/constants/trending'
import { movieApi } from '../../service/movieService'
import { MovieType } from '../../types/movie.type'
import { decodeHtml } from 'src/lib/utils'

const fetchmovies = async () => {
  const result = await Promise.all(
    TRENDING_MOVIES.map((slug) => store.dispatch(movieApi.endpoints.getMovieDetail.initiate(slug)).unwrap())
  )
  return result.map((res) => res.movie!)
}

const TrendingMovies = () => {
  const OPTIONS: EmblaOptionsType = { loop: true }
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Fade()])

  const [movieList, setMovieList] = useState<MovieType[]>([])
  const [thumbList, setThumbList] = useState<string[]>([])
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // update index when carousel change
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentThumbIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

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
          'inset-0 flex min-h-[300px] flex-col overflow-hidden text-foreground',
          'sm:h-[420px]',
          'md:absolute md:h-[700px]',
          'xl:h-[760px]'
        )}
      >
        {/* Movie Content */}
        <div
          className={clsx(
            'image-container relative flex h-auto min-h-[240px] flex-col overflow-hidden',
            'sm:aspect-[16/9] sm:max-h-[320px] sm:gap-2.5',
            'md:max-h-[600px] md:min-h-[450px] md:gap-3.5',
            'xl:min-h-[660px] xl:!bg-none',
            'bg-cover bg-center bg-no-repeat'
          )}
          id="movie-content"
          ref={emblaRef}
        >
          {/* Poster */}
          <div className="absolute inset-0 flex">
            {movieList.map((movie) => (
              <Link to={`phim/${currentRecommend.slug}`} key={movie._id} className="w-full flex-none lg:cursor-grab">
                <img
                  src={movie.thumb_url}
                  alt={movie.name}
                  className="h-full w-full object-cover transition-all duration-300"
                />
              </Link>
            ))}
          </div>
          {/* Movie Info Container */}
          <div
            className={clsx(
              'z-10 mt-auto cursor-grab space-y-3 bg-gradient-to-b from-main-bg/10 via-main-bg/70 to-main-bg px-mobile md:space-y-4 md:px-medium xl:space-y-5 xl:px-desktop',
              'lg:from-transparent lg:via-main-bg/70 lg:to-main-bg'
            )}
          >
            {/* Title */}
            <Link to={`phim/${currentRecommend.slug}`} className="text-center sm:inline-block sm:text-left">
              <h1
                key={currentRecommend._id}
                className="animate-fade-in text-[22px] font-bold hover:text-yellow sm:w-fit sm:text-[26px] lg:text-3xl 2xl:text-4xl"
              >
                {currentRecommend.name}
              </h1>
            </Link>

            {/* Year & Episode/Rating */}
            <div
              className={clsx(
                'flex select-none items-center justify-center space-x-2 pl-0 text-xs',
                'sm:justify-start',
                '2xl:text-sm'
              )}
            >
              <span className="rounded-md border border-white px-2 py-1">{currentRecommend.year}</span>
              <span className="rounded-md border border-white px-2 py-1">{currentRecommend.episode_current}</span>
            </div>

            {/* Category Tags */}
            <div className="hidden flex-wrap gap-2 text-xs sm:flex 2xl:text-sm">
              {currentRecommend.category.map((c) => (
                <Link
                  to={`the-loai/${c.slug}`}
                  key={c.slug}
                  className="animate-fade-in select-none rounded-md bg-white/20 px-2 py-1 hover:text-yellow"
                >
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>

            {/* Description */}
            <div className="hidden w-[55%] select-none pb-1 md:block xl:w-[50%] xl:pb-2 2xl:w-[45%] 2xl:pb-4">
              <p key={currentRecommend._id} className="animate-fade-in text-sm md:!line-clamp-3">
                {decodeHtml(currentRecommend.content)}
              </p>
            </div>
          </div>
        </div>

        {/* Actions & Carousel */}
        <div
          className={clsx(
            'z-10 !ml-0 flex h-[60px] w-full items-center justify-between px-mobile md:px-medium xl:px-desktop',
            'sm:h-[100px] sm:from-main-bg sm:via-sub-bg/50 sm:to-sub-bg'
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
                onClick={() => emblaApi?.scrollTo(index)}
                className={clsx(
                  'h-[26px] w-[40px] overflow-hidden rounded-md border-2 transition-all duration-300 hover:border-white',
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
