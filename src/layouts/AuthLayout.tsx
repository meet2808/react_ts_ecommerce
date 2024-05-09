import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <div>
        <h1 className="text-[30px] font-bold uppercase text-center">
          productmart
        </h1>
        <p className="text-[14px] text-neutral-600">Register yourself and get unique experience of shopping</p>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
