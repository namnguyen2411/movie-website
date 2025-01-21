import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import clsx from 'clsx'
import { Button } from 'src/components/UI/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from 'src/components/UI/navigation-menu'
import { Search, X, Menu } from 'lucide-react'
import logo from 'src/assets/logo.png'
import { NAV_ITEMS, COUNTRIES } from 'src/constants/navigation'
import { SearchBar, MobileSearchBar } from 'src/features/search/components/SearchBar'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchBarOpen, setIsMobileSearchBarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  // Open/close mobile menu on resize
  useEffect(() => {
    if (isMobileMenuOpen) {
      const mobileMenu = document.getElementById('mobile-menu')!
      const handleResize = () => {
        if (window.innerWidth >= 1280) {
          mobileMenu.style.display = 'none'
        } else {
          mobileMenu.style.display = 'flex'
        }
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen])

  // Check if user has scrolled down and change background color
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  return (
    <header
      className={clsx(
        'sticky top-0 z-20 flex items-center justify-between px-4 py-3 text-foreground',
        isScrolled ? 'bg-[#0f111a]' : 'bg-transparent'
      )}
    >
      {/* Mobile Nav Menu Toggle Button */}
      {!isMobileSearchBarOpen && (
        <button className="z-20 block xl:hidden" onClick={toggleMobileMenu}>
          <div className="relative h-[30px] w-[30px]">
            <Menu
              size={30}
              className={`absolute transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`}
            />
            <X
              size={30}
              color="red"
              className={`absolute transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
              }`}
            />
          </div>
        </button>
      )}

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <NavigationMenu
          className="fixed left-2 top-[118px] z-10 min-w-[350px] rounded-md bg-[#3b4987f2] py-5"
          id="mobile-menu"
        >
          <NavigationMenuList className="flex !w-[310px] flex-col space-y-10">
            {/* Login Button */}
            <Button variant="secondary" className="w-full">
              Đăng nhập
            </Button>

            {/* Nav Items */}
            <div className="grid !w-[310px] grid-cols-2 gap-8">
              {NAV_ITEMS.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <Link to={item.path}>
                    <span className="font-medium hover:text-yellow">{item.label}</span>
                  </Link>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent !p-0 text-base hover:!text-yellow">
                  Quốc gia
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-0 !min-w-[120px]">
                  {/* Countries */}
                  {COUNTRIES.map((country) => (
                    <Link key={country.name} to={country.path}>
                      <span className="block p-2 hover:bg-yellow/50">{country.name}</span>
                    </Link>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      {/* Logo */}
      {!isMobileSearchBarOpen && (
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Movie App Logo" className="h-20" />
          </Link>
        </div>
      )}

      {/* Desktop Search Bar */}
      <SearchBar />

      {/* Button open Mobile Search Bar */}
      {!isMobileSearchBarOpen && (
        <>
          <Button
            variant="outline"
            className="hidden p-4 text-base text-black sm:flex xl:hidden"
            onClick={() => setIsMobileSearchBarOpen(true)}
          >
            <Search className="mr-2 text-black" size={20} />
            Tìm kiếm
          </Button>

          <button className="block sm:hidden" onClick={() => setIsMobileSearchBarOpen(true)}>
            <Search size={24} />
          </button>
        </>
      )}

      {/* Mobile Search Bar */}
      {isMobileSearchBarOpen && <MobileSearchBar setIsMobileSearchBarOpen={setIsMobileSearchBarOpen} />}

      {/* Desktop Nav Menu */}
      <NavigationMenu className="hidden xl:block">
        <NavigationMenuList className="flex space-x-11 2xl:space-x-14">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="!bg-transparent text-base !text-foreground">
              Quốc gia
            </NavigationMenuTrigger>
            <NavigationMenuContent className="left-0 min-w-[120px]">
              {/* Countries */}
              {COUNTRIES.map((country) => (
                <Link key={country.name} to={country.path}>
                  <span className="block p-2 hover:bg-yellow/50">{country.name}</span>
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Nav Items */}
          {NAV_ITEMS.map((item) => (
            <NavigationMenuItem key={item.label}>
              <Link to={item.path}>
                <span className="font-medium hover:text-yellow">{item.label}</span>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Login Button */}
      <Button variant="secondary" className="hidden size-fit text-base xl:block">
        Đăng nhập
      </Button>
    </header>
  )
}

export default Header
