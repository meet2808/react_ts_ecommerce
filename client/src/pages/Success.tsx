import { useEffect, useState } from "react";
import { useOrder } from "@/context/useOrder";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/useAuthanticate";

const Success = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cart, setCart } = useCart();
  const { placeOrder } = useOrder();
  const { user } = useAuth();
  const address = user.address
  const userId = user?.id
  const items = cart.items;
  const totalPrice = cart.totalPrice;

  useEffect(() => {
    if (!orderPlaced && items.length > 0) {
      let data = { items, totalPrice, userId, address };

      const placeOrderAsync = async () => {
        try {
          await placeOrder(data);
          setOrderPlaced(true);
          // Clear the cart after placing the order
          setCart({ items: [], totalPrice: 0, totalUnits: 0 });
        } catch (error) {
          console.error("Error placing order:", error);
          // Handle error (e.g., show notification to the user)
        }
      };
      placeOrderAsync();
    }
  }, [items, orderPlaced, totalPrice, userId, user.address, placeOrder, setCart]);

  useEffect(() => {
    return () => {
      setOrderPlaced(false); 
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-600">Thank you for your purchase.</p>
        <button
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
