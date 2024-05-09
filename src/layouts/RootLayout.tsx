import { Navbar, Footer } from "@/components";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
