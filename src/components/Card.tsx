import Book from "@/assets/images/thumbnail.jpg";
import { BsPlus, BsDash, BsFillTrashFill } from "react-icons/bs";

const Card = () => {
  return (
    <>
      <ul className="flex-grow py-4">
        <li className="border-b border-neutral-300 mx-2 my-1">
          <div className="flex flex-row gap-3 px-2 py-2">
            <div>
              <img src={Book} className="w-[150px] h-[140px]" alt="t-shirt" />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-md">T-Shirt</span>
              <span>₹100</span>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row items-center gap-5 border border-neutral-200 rounded-full py-2 px-4">
                  <button>
                    <BsDash size={25} />
                  </button>
                  <span>1</span>
                  <button>
                    <BsPlus size={25} />
                  </button>
                </div>

                <button>
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Card;
