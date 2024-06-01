import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsXLg } from "react-icons/bs";
import EmptyCart from "@/assets/images/empty.png";
import Card from "./Card";
import { Link } from "react-router-dom";
import OpenCart from "./OpenCart";
import { useCart } from "@/context/useCart";

type PropType = {
  quantity: number;
};

const CartModel = ({ quantity }: PropType) => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const openCart = () => setIsModelOpen(true);
  const closeCart = () => setIsModelOpen(false);
  const userId = JSON.parse(localStorage.getItem("user")!)?.id;
  const { cart, fetchCartItems, setCart, } = useCart();
  const items = cart.items;

  useEffect(() => {
    if (userId) {
      fetchCartItems()
    } else if(items.length === 0){
      let cart = JSON.parse(localStorage.getItem('cart')!);
      setCart(cart)
    }
  }, [userId, items.length]);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  
  return (
    <>
      <button onClick={openCart}>
        <OpenCart quantity={quantity} />
      </button>
      <Transition show={isModelOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              <div className="flex flex-row items-center">
                <h1 className="absolute top-6 left-5 font-bold text-xl">
                  My Cart
                </h1>

                <button
                  className="absolute top-5 right-4 border border-neutral-200 rounded-sm px-4"
                  onClick={closeCart}
                >
                  <BsXLg size={18} className="h-11 font-bold" />
                </button>
              </div>

              {quantity ? (
                <>
                  <div className="flex flex-col mt-20 justify-between p-0 h-full w-full">
                    <div className="overflow-auto h-72 lg:h-96">
                      {items?.map((item) => (
                        <Card
                          key={item.id}
                          id={item.id}
                          price={item.price}
                          quantity={item.quantity}
                          thumbnail={item.thumbnail}
                          title={item.title}
                        />
                      ))}
                    </div>
                    {/* <div className="flex flex-col gap-2 py-5 px-2"> */}
                    <div className="flex flex-col gap-2 px-2">
                      <div className="flex flex-row items-center justify-between">
                        <span>Total</span>
                        <span>₹{parseFloat(cart.totalPrice).toFixed(2)}</span>
                      </div>

                      <Link to="/checkout">
                        <button
                          className="relative flex w-[300px] items-center m-auto justify-center bg-blue-600 p-2 tracking-wide rounded-full text-white hover:opacity-90"
                          onClick={() => setIsModelOpen(false)}
                        >
                          <span>Proceed To Checkout</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <img
                    src={EmptyCart}
                    alt="Empty Cart"
                    className="absolute top-20 left-10 h-[300px] w-[300px]"
                  />
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default CartModel;
