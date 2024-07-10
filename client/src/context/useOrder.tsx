import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import orderService from "@/service/Order";
import { useAuth } from "./useAuthanticate";
import { useCart } from "./useCart";
import { ORDER, ORDER_RES_ITEMS } from "@/types";

export const INITIAL_ORDER = {
  orders: [],
};

export type ORDER_CONTEXT_TYPE = {
  orders: ORDER[];
  placeOrder: () => void;
  fetchOrders: () => void;
};

export const OrderContext = createContext<ORDER_CONTEXT_TYPE>(INITIAL_ORDER);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<ORDER[]>([]);
  const user = JSON.parse(localStorage.getItem('user')!);
  const userId = user?.id
  // const { cart } = useCart();
  // let { items, totalPrice } = cart;

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    } else {
      localStorage.removeItem("orders");
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await orderService.fetchAllOrders(userId);
      console.log(response)
      setOrders((prevOrders) => {
        const items = response.data?.map((item: any) => {
          orders.push(item.cartItems);
        });

        return items;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async (data : ORDER) => {
    try {
      const newOrder = await orderService.placeOrder(data);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
