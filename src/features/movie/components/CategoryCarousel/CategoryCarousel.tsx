import { Link } from 'react-router'
import clsx from 'clsx'
import { Carousel, CarouselContent, CarouselItem } from 'src/components/UI/carousel'
import { Card, CardContent } from 'src/components/UI/card'
import { CATEGORIES } from 'src/constants/categories'
import { ROUTES } from 'src/constants/routes'

const CategoryCarousel = () => {
  return (
    <div className="mt-5 px-mobile md:mt-10 md:px-medium xl:mt-14 xl:px-desktop">
      <h3>Bạn thích thể loại gì?</h3>

      {/* Mobile Carousel */}
      <Carousel opts={{ align: 'start', dragFree: true }} className="hidden w-full max-[480px]:block">
        <CarouselContent>
          {CATEGORIES.map((c) => (
            <CarouselItem className="basis-1/3" key={c.slug}>
              <Link to={`/the-loai/${c.slug}`}>
                <Card
                  className={clsx(
                    'flex h-[66px] w-[110px] items-center justify-center border-none shadow-md',
                    c.bgColor
                  )}
                >
                  <CardContent className="p-4 text-center font-semibold text-foreground">{c.name}</CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
          <CarouselItem className="basis-1/3">
            <Link to={ROUTES.BROWSE}>
              <Card className="flex h-[66px] w-[110px] items-center justify-center border-none bg-white/10 shadow-md">
                <CardContent className="p-4 text-center font-semibold text-foreground">Xem Thêm</CardContent>
              </Card>
            </Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Desktop - Grid for larger screens (> 480px) */}
      <div
        className={clsx(
          'grid h-[262px] grid-flow-row grid-cols-4 gap-2.5 max-[800px]:grid-cols-3 max-[480px]:hidden max-[480px]:gap-3',
          'sm:grid',
          'md:gap-3 min-[800px]:h-fit',
          'lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 2xl:gap-4'
        )}
      >
        {CATEGORIES.map((c) => (
          <Link
            to={`/the-loai/${c.slug}`}
            key={c.slug}
            className={clsx(
              'flex h-auto items-center justify-center rounded-xl text-center font-semibold transition-transform duration-300 hover:-translate-y-1 min-[800px]:h-[100px] min-[800px]:max-w-[200px] 2xl:text-lg 2xl:hover:-translate-y-2',
              c.bgColor
            )}
          >
            {c.name}
          </Link>
        ))}
        <Link
          to={ROUTES.BROWSE}
          className="flex h-auto items-center justify-center rounded-xl bg-white/10 text-center font-semibold transition-transform duration-300 hover:-translate-y-1 min-[800px]:h-[100px] min-[800px]:max-w-[200px] 2xl:text-lg 2xl:hover:-translate-y-2"
        >
          Xem Thêm
        </Link>
      </div>
    </div>
  )
}
export default CategoryCarousel
