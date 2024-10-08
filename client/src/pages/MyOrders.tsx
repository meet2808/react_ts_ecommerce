import { useEffect, useState } from "react";
import axios from "axios";
import conf from "@/conf/conf";
import { useAuth } from "@/context/useAuthanticate";
import { useOrder } from "@/context/useOrder";

const MyOrders = () => {
  const { user } = useAuth();
  const { orders, fetchOrders } = useOrder();
  // console.log("orders", orders)
  const userId = user?.id;
  const access_token = user?.access_token
  // console.log("userId", userId)
  // const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">No orders found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold text-gray-700">
                  Order #{order._id}
                </h2>
                <p className="text-gray-600">
                  Total Price: ${order.totalPrice.toFixed(2)}
                </p>
                <ul className="mt-4">
                  {order?.orderItems?.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between text-gray-700 mb-2"
                    >
                      <span>
                        <img src={item.thumbnail} alt={item.title} className="h-20" />
                      </span>
                      <span>{item.title}</span>
                      <span>x{item.quantity}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
