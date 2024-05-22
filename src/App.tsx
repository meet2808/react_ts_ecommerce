import { Routes, Route } from "react-router-dom";
import { RootLayout, AuthLayout } from "@/layouts";
import { Toaster } from "@/components/ui/toaster";
import { Home, About, Category, SignIn, SignUp, Checkout } from "@/pages";

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
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
