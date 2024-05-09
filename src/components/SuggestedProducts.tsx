import { Link } from "react-router-dom";
import laptop from "@/assets/images/laptop.png";
import purses from "@/assets/images/purses.png";
import shoes from "@/assets/images/shoes.png";
import sunglasses from "@/assets/images/sunglasses.png";
import watch from "@/assets/images/watch.png";
import tshirt from "@/assets/images/thumbnail.jpg";

const SuggestedProducts = () => {
  return (
    <div className="flex flex-col gap-5 p-5 lg:py-[30px] lg:px-[120px] md:py-[10px] md:px-4">
      <p className="text-3xl text-center font-bold text-gray-800">
        Best Selling Products
      </p>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 md:grid-cols-2">
        <Link
          to={"/category/shoes"}
          className={`w-full rounded-lg border bg-white hover:border-blue-600 p-5`}
        >
          <div className="flex flex-col md:h-[230px] md:[300px]-full h-[230px] w-full sm:p-5 p-5 overflow-hidden  dark:bg-black">
            <img
              src={shoes}
              alt={"Shoes Imgae"}
              className="object-cover self-center items-center"
              width={200}
            />
          </div>
          <p className="text-xl font-bold text-black-500 text-center">Shoes</p>
        </Link>

        <Link
          to={"/category/laptop"}
          className={`w-full rounded-lg border bg-white hover:border-blue-600 p-5`}
        >
          <div className="flex flex-col md:h-[230px] md:[300px]-full h-[230px] w-full sm:p-5 p-5 overflow-hidden  dark:bg-black">
            <img
              src={laptop}
              alt={"Laptop Imgae"}
              className="object-cover self-center mt-5 items-center"
              width={200}
            />
          </div>
          <p className="text-xl font-bold text-black-500 text-center">Laptop</p>
        </Link>

        <Link
          to={"/category/bags"}
          className={`w-full rounded-lg border bg-white hover:border-blue-600 p-5`}
        >
          <div className="flex flex-col md:h-[230px] md:[300px]-full h-[230px] w-full sm:p-5 p-5 overflow-hidden  dark:bg-black">
            <img
              src={purses}
              alt={"Purse Imgae"}
              className="object-cover self-center items-center"
              width={200}
            />
          </div>
          <p className="text-xl font-bold text-black-500 text-center">Purse</p>
        </Link>

        <Link
          to={"/category/sunglasses"}
          className={`w-full rounded-lg border bg-white hover:border-blue-600 p-5`}
        >
          <div className="flex flex-col md:h-[230px] md:[300px]-full h-[230px] w-full sm:p-5 p-5 overflow-hidden  dark:bg-black">
            <img
              src={sunglasses}
              alt={"Sunglasses Imgae"}
              className="object-cover mt-7 self-center items-center"
              width={200}
            />
          </div>
          <p className="text-xl font-bold text-black-500 text-center">
            Sunglasses
          </p>
        </Link>

        <Link
          to={"/category/watch"}
          className={`w-full rounded-lg border bg-white hover:border-blue-600 p-5`}
        >
          <div className="flex flex-col md:h-[230px] md:[300px]-full h-[230px] w-full sm:p-5 p-5 overflow-hidden  dark:bg-black">
            <img
              src={watch}
              alt={"Watch Imgae"}
              className="object-cover self-center items-center"
              width={200}
            />
          </div>
          <p className="text-xl font-bold text-black-500 text-center">Watch</p>
        </Link>

        <Link
          to={"/category/tshirts"}
          className={`w-full rounded-lg border bg-white hover:border-blue-600 p-5`}
        >
          <div className="flex flex-col md:h-[230px] md:[300px]-full h-[230px] w-full sm:p-5 p-5 overflow-hidden  dark:bg-black">
            <img
              src={tshirt}
              alt={"Tshirt Imgae"}
              className="object-cover self-center items-center"
              width={200}
            />
          </div>
          <p className="text-xl font-bold text-black-500 text-center">
            T-shirt
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SuggestedProducts;
