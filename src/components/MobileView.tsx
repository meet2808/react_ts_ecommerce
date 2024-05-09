import { useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { BsList, BsXLg } from "react-icons/bs";

const MobileView = () => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    return (
        <div>
            <button className="border border-neutral-200 rounded-sm px-3" onClick={() => { setIsModelOpen(true) }}>
                <BsList size={25} className="h-11" />
            </button>

            <nav
                className={`${isModelOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 fixed inset-y-0 left-0 lg:static lg:inset-auto w-full lg:w-auto h-full lg:h-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out transform`}
            >
                <button className="absolute top-5 left-4 border border-neutral-200 rounded-sm px-4" onClick={() => { setIsModelOpen(false) }}>
                    <BsXLg size={18} className="h-11 font-bold" />
                </button>

                <div className="absolute top-20 left-4 flex flex-col gap-4">
                    <div className="relative w-[350px]">
                        <Search />
                    </div>

                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link to={"#"} className="text-[20] h-full text-black-500 text-lg md:flex">All</Link>
                        </li>
                        <li>
                            <Link to={"#"} className=" text-[20] h-full text-black-500 text-lg md:flex">Shirts</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default MobileView;