import { BsPlus, BsDash, BsFillTrashFill } from "react-icons/bs";
import { useCart } from "@/context/useCart";
import { useToast } from "@/components/ui/use-toast";

const Card = ({
  thumbnail,
  price,
  title,
  quantity,
  id,
  stock,
}: {
  thumbnail: string;
  price: number;
  title: string;
  quantity: number;
  id: number;
  stock: number;
}) => {
  const { toast } = useToast();
  const { addOrUpdateCartItem, removeCartItem, cart } = useCart();

  const updateQuantity = (type: string) => {
    let product = { id, title, price, quantity, thumbnail, stock };
    if (type == "increment" && quantity >= 1) {
      if (quantity < stock)
        addOrUpdateCartItem({ ...product, quantity: 1 }, "increment");
      else if (quantity === stock)
        toast({
          title: "Cannot increment: Quantity exceeds available stock.",
          variant: "destructive",
        });
    } else if (type == "decrement" && quantity !== 1){
      addOrUpdateCartItem({ ...product, quantity: 1 }, "decrement");
    }
  };
  return (
    <>
      <ul className="flex-grow py-4">
        <li className="border-b border-neutral-300 mx-2 my-1">
          <div className="flex flex-row gap-3 px-2 py-2">
            <div>
              <img
                src={thumbnail}
                className="w-[150px] h-[140px]"
                alt={title}
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-md">{title}</span>
              <span>₹{price}</span>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row items-center gap-5 border border-neutral-200 rounded-full py-2 px-4">
                  <button>
                    <BsDash
                      size={25}
                      onClick={() => updateQuantity("decrement")}
                    />
                  </button>
                  <span>{quantity}</span>
                  <button>
                    <BsPlus
                      size={25}
                      onClick={() => updateQuantity("increment")}
                    />
                  </button>
                </div>

                <button>
                  <BsFillTrashFill onClick={() => removeCartItem(id)} />
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
