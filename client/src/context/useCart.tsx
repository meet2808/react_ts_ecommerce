import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCT } from "@/types";
import cartService from "@/service/Cart";

export const INITIAL_CART = {
  items: [],
  totalPrice: 0,
  totalUnits: 0,
};

export type CART_CONTEXT_TYPE = {
  cart: {
    items: PRODUCT[];
    totalPrice: number;
    totalUnits: number;
  };
  setCart: React.Dispatch<React.SetStateAction<typeof INITIAL_CART>>;
  addOrUpdateCartItem: (product: PRODUCT) => void;
  removeCartItem: (productId: string) => void;
  fetchCartItems: () => void;
};

export const CartContext = createContext<CART_CONTEXT_TYPE>({
  cart: INITIAL_CART,
  setCart: () => {},
  addOrUpdateCartItem: () => {},
  removeCartItem: () => {},
  fetchCartItems: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState(INITIAL_CART);

  useEffect(() => {
    const storedCart = JSON.parse(
      localStorage.getItem("cart") || JSON.stringify(INITIAL_CART)
    );
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const addOrUpdateCartItem = async (
    product: PRODUCT,
    operation: "increment" | "decrement" | "add" = "add"
  ) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.id === product.id
      );
      let updatedItems = [...prevCart.items];
     
      if (existingItemIndex >= 0) {
        const existingItem = updatedItems[existingItemIndex];
        let updatedQuantity = existingItem.quantity;
        if (operation === "increment") {
          updatedQuantity += product.quantity;
        } else if (operation === "decrement") {
          updatedQuantity = Math.max(
            existingItem.quantity - product.quantity,
            0
          );
        } else {
          updatedQuantity = product.quantity;
        }
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: updatedQuantity,
        };
      } else if(operation === "add") {
        updatedItems.push(product);
      }

      const updatedTotalPrice = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const updatedTotalUnits = updatedItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      const updatedCart = {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
        totalUnits: updatedTotalUnits,
      };

      return updatedCart;
    });

    try {
      await cartService.addOrUpdateCartItem(product);
    } catch (error) {
      console.error("Failed to sync cart item with backend:", error);
    }
  };

  const removeCartItem = async (productId: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.id !== productId
      );
      const updatedTotalPrice = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const updatedTotalUnits = updatedItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      const updatedCart = {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
        totalUnits: updatedTotalUnits,
      };

      return updatedCart;
    });

    try {
      await cartService.removeCartItem(productId);
    } catch (error) {
      console.error("Failed to sync cart item with backend:", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await cartService.getCart();
      setCart({
        items: response.data.cartItems,
        totalPrice: response.data.cartItems.reduce(
          (acc: number, item: PRODUCT) => acc + item.price * item.quantity,
          0
        ),
        totalUnits: response.data.cartItems.reduce(
          (acc: number, item: PRODUCT) => acc + item.quantity,
          0
        ),
      });
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addOrUpdateCartItem,
        removeCartItem,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
