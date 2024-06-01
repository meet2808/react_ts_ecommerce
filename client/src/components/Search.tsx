import { BiSearch } from "react-icons/bi";

const Search = () => {
    return (
        <div className="relative w-max-[550px] w-full lg:w-80 md:w-60 xl:w-full">
            <input type="text" placeholder="Search for products..." className="w-full rounded-md h-10 p-4 border text-sm text-black placeholder:text-neutral-500" />

            <div className="absolute top-0 right-4">
                <BiSearch className="h-10" />
            </div>
        </div>
    )
}
export default Search;