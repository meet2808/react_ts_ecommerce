import { useAuth, INITIAL_USER } from "@/context/useAuthanticate";
import Search from "./Search";
import MobileView from "./MobileView";
import CartModel from "./CartModel";
import { BiSolidUser, BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/useCart";

const Navbar = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    isAuthenticated,
    setIsAuthenticated,
  } = useAuth();
  const { cart } = useCart();

  const navigate = useNavigate();
  
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    localStorage.setItem("user", JSON.stringify(INITIAL_USER));
    localStorage.removeItem("cart");
    navigate("/auth/sign-in");
  };

  return (
    <nav className="relative py-4 px-5 flex items-center justify-between">
      <div className="block flex-none md:hidden">
        <MobileView />
      </div>

      {/* Logo Section */}
      {/* <div className="uppercase font-bold ml-5 md :mr-0">productmart</div> */}
      <Link className="uppercase font-bold ml-5 md:mr-0 no-underline" to={"/"}>
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
          <CartModel quantity={cart.totalUnits} />
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BiSolidUser size={25} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {isAuthenticated ? (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>My Orders</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleLogOut();
                    }}
                    className="cursor-pointer flex gap-2"
                  >
                    <BiLogOut /> Log Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/auth/sign-in");
                    }}
                  >
                    Sign In
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    onClick={() => {
                      authService.logOut();
                      setIsLoggedIn(false);
                      setIsAuthenticated(false);
                      navigate("/auth/sign-in");
                    }}
                    className="cursor-pointer flex gap-2"
                  >
                    <BiLogOut /> Log Out
                  </DropdownMenuItem> */}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
