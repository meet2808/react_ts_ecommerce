import Search from "./Search";
import MobileView from "./MobileView";
import CartModel from "./CartModel";
import { BiSolidUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="relative py-4 px-5 flex items-center justify-between">
      <div className="block flex-none md:hidden">
        <MobileView />
      </div>

      {/* Logo Section */}
      {/* <div className="uppercase font-bold ml-5 md :mr-0">productmart</div> */}
      <Link
        className="uppercase font-bold ml-5 md:mr-0 no-underline"
        to={"/"}
      >
        productmart
      </Link>

      {/* Search Field */}
      <div className="hidden first-line:relative justify-center w-[550px] md:flex ">
        <Search />
      </div>

      {/* Links Section */}
      <ul className="flex items-center justify-between gap-5">
        <li>
          <Link
            to={"/category/all"}
            className="hidden text-[20] h-full text-neutral-500 text-sm md:flex hover:text-black hover:underline underline-offset-4"
          >
            All
          </Link>
        </li>

        <li>
          <Link
            to={"#"}
            className="hidden text-[20] h-full text-neutral-500 text-sm md:flex hover:text-black hover:underline underline-offset-4"
          >
            Shirts
          </Link>
        </li>
        <li>
          <CartModel quantity={1} />
        </li>
        <li>
          <Link
            to={"#"}
            className={`text-[20] h-full text-black-500 text-sm`}
          >
            <BiSolidUser size={25} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;