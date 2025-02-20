import { Link } from 'react-router'
import clsx from 'clsx'
import { Card, CardContent, CardFooter } from 'src/components/UI/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'src/components/UI/carousel'
import { useGetMoviesByCountryQuery } from 'src/features/movie/service/movieService'
import { NEW_MOVIES_BY_COUNTRY } from 'src/constants/newMoviesByCountry'

const NewMoviesByCountry = () => {
  const { data: moviesData1 } = useGetMoviesByCountryQuery({ country: NEW_MOVIES_BY_COUNTRY[0].path })
  const { data: moviesData2 } = useGetMoviesByCountryQuery({ country: NEW_MOVIES_BY_COUNTRY[1].path })
  const { data: moviesData3 } = useGetMoviesByCountryQuery({ country: NEW_MOVIES_BY_COUNTRY[2].path })

  if (!moviesData1?.data || !moviesData2?.data || !moviesData3?.data) return null

  const moviesData = [moviesData1.data, moviesData2.data, moviesData3.data]
  const imgDomain = moviesData1.data.APP_DOMAIN_CDN_IMAGE

  return (
    <div className="mt-6 bg-sub-bg px-mobile py-4 sm:py-6 md:mt-10 md:px-medium xl:mt-14 xl:px-desktop xl:py-8">
      <div className="flex flex-col gap-5 2xl:gap-8">
        {moviesData.length > 0 &&
          moviesData.map((movieList, index) => (
            <div key={index} className="xl:flex">
              {/* Header and button */}
              <div className="flex items-center justify-between pb-3 xl:min-w-[190px] xl:flex-col xl:items-start xl:justify-center xl:pb-0 xl:pr-6">
                <h2 className={`${NEW_MOVIES_BY_COUNTRY[index].className} bg-clip-text pb-0 xl:pb-4`}>
                  {`Phim ${NEW_MOVIES_BY_COUNTRY[index].country} mới`}
                </h2>
                <span>
                  <Link
                    to={`/quoc-gia/${NEW_MOVIES_BY_COUNTRY[index].path}`}
                    className="text-xs font-medium hover:text-yellow sm:text-sm"
                  >
                    Xem thêm
                  </Link>
                </span>
              </div>
              {/* Carousel */}

              <Carousel opts={{ align: 'start', skipSnaps: true }} className="xl:w-[calc(100%-214px)]">
                <CarouselContent>
                  {movieList.items.map((movie, index) => (
                    <CarouselItem
                      className={clsx(
                        'basis-[49%] md:basis-1/2 lg:basis-1/3 2xl:basis-1/5',
                        index > 0 ? 'min-[390px]:-ml-2 md:-ml-1 xl:ml-0' : ''
                      )}
                      key={movie._id}
                    >
                      <Link to={`/phim/${movie.slug}`}>
                        <Card
                          className={clsx(
                            'relative flex min-w-[165px] flex-col items-center justify-center border-none bg-transparent shadow-none max-[390px]:h-[155px]'
                          )}
                        >
                          {/* Thumb Img */}
                          <CardContent className="relative min-h-[105px] w-full p-0">
                            <img
                              className="h-full w-full rounded-md object-cover"
                              src={`${imgDomain}/${movie.thumb_url}`}
                              alt={movie.name}
                            />
                            {/* Badge */}
                            <span className="absolute bottom-2 left-0 right-0 flex flex-col gap-2">
                              {(movie.type === 'series' || movie.type === 'tvshows') && (
                                <p className="w-fit rounded-br-sm rounded-tr-sm bg-zinc-600 px-2 py-1 text-xs text-foreground">
                                  {movie.episode_current}
                                </p>
                              )}
                              {movie.type === 'single' && (
                                <>
                                  <p className="w-fit rounded-br-sm rounded-tr-sm bg-blue-500 px-2 py-1 text-xs text-foreground">
                                    {movie.lang.toLowerCase().includes('vietsub') && 'Phụ đề'}
                                  </p>
                                  {(movie.lang.toLowerCase().includes('Thuyết Minh') && (
                                    <p className="w-fit rounded-br-sm rounded-tr-sm bg-green-500 px-2 py-1 text-xs text-foreground">
                                      Thuyết minh
                                    </p>
                                  )) ||
                                    (movie.lang.toLowerCase().includes('Lồng tiếng') && (
                                      <p className="w-fit rounded-br-sm rounded-tr-sm bg-red-500 px-2 py-1 text-xs text-foreground">
                                        Lồng tiếng
                                      </p>
                                    ))}
                                </>
                              )}
                            </span>
                          </CardContent>
                          {/* Title */}
                          <CardFooter className="flex-1 p-0 pt-2 text-center text-[13px] text-sm font-semibold text-foreground hover:text-yellow xl:text-base">
                            {movie.name}
                          </CardFooter>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 hidden text-black disabled:opacity-0 md:flex xl:-translate-y-8" />
                <CarouselNext className="-right-3.5 hidden text-black disabled:opacity-0 md:flex xl:-translate-y-8" />
              </Carousel>
            </div>
          ))}
      </div>
    </div>
  )
}
export default NewMoviesByCountry
