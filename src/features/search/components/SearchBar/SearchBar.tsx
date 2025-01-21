import { Search } from 'lucide-react'
import { Input } from 'src/components/UI/input'

const SearchBar = () => {
  return (
    <div className="relative hidden items-center rounded-md bg-[#ffffff14] xl:flex">
      <Search className="absolute left-3 mr-2 text-foreground" size={20} />
      <Input
        type="text"
        placeholder="Nhập tên phim"
        className="w-[330px] border-transparent py-5 pl-12 pr-4 transition-all duration-300 placeholder:text-foreground hover:border-white focus:border-white 2xl:w-[380px]"
      />
    </div>
  )
}
export default SearchBar
