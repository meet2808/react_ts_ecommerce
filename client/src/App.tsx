import { Routes, Route } from "react-router-dom";
import { RootLayout, AuthLayout } from "@/layouts";
import { Toaster } from "@/components/ui/toaster";
import { Home, About, Category, SignIn, SignUp, Checkout, ProductDetail, Success, Cancel, MyOrders } from "@/pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/detail/:productId" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
