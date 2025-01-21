import { Search, X } from 'lucide-react'
import { Input } from 'src/components/UI/input'

interface MobileSearchBarProps {
  setIsMobileSearchBarOpen: (value: boolean) => void
}

const MobileSearchBar = ({ setIsMobileSearchBarOpen }: MobileSearchBarProps) => {
  return (
    <div className="flex h-[80px] flex-1 items-center space-x-4 xl:hidden">
      <div className="relative flex flex-1 items-center rounded-md bg-[#ffffff14]">
        <Search className="absolute left-3 mr-2 text-foreground" size={20} />
        <Input
          type="text"
          placeholder="Nhập tên phim"
          className="w-full border-transparent py-5 pl-12 pr-4 transition-all duration-300 placeholder:text-foreground hover:border-white focus:border-white 2xl:w-[380px]"
        />
      </div>
      <button onClick={() => setIsMobileSearchBarOpen(false)}>
        <X className="mr-2" size={30} color="red" />
      </button>
    </div>
  )
}
export default MobileSearchBar
