import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/useAuthanticate.tsx";
import { CartProvider } from "@/context/useCart.tsx";
import { OrderProvider } from "@/context/useOrder.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </OrderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
