import { FOOTER_LINKS } from "../utils";
import { Link } from "react-router-dom";
import { ITEM_TYPE } from "../types";

const Footer = () => {
  return (
    <footer className="mt-4 border-t-red-300">
      <hr />
      <div className="flex flex-col gap-6 px-6 py-9 sm:px-0 sm:py-0 mt-5">
        {/* Router link and logo section */}
        <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col gap-5 lg:gap-20 md:gap-10 sm:justify-start lg:justify-center sm:items-start md:items-center lg:items-center">
          <div className="uppercase font-bold ml-0 md:ml-5 lg:ml-5 md:mr-0">
            Productmart
          </div>

          <div>
            <ul className="flex flex-col lg:flex-row md:flex-row sm:flex-col gap-5">
              {FOOTER_LINKS?.map((item : ITEM_TYPE) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="text-[20] h-full text-neutral-500 text-sm md:flex hover:text-black hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="m-2 text-neutral-500 text-[15px] flex flex-col md:flex-row sm:flex-col gap-5 justify-center items-center sm:m-auto">
          <span>© 2023 Inc. All rights reserved.</span>
          <span className="hidden lg:block sm:block">|</span>
          <span className="sm:text-center">Designed By Meet</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
