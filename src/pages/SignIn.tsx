import { Input } from "@/components";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="w-[400px] px-[5px] py-[10px]">
      <h1 className="text-[30px] font-bold uppercase text-center">Sign In</h1>

      <div className="py-1">
        <Input
          type={"email"}
          name="email"
          label="Email"
          errors={"Please enter your email"}
          value={""}
          placeholder={"Email"}
          hasError={false}
        />

        <Input
          type={"password"}
          name="password"
          label="Password"
          errors={"Please enter your password"}
          value={"123"}
          placeholder={"Password"}
          hasError={false}
        />
      </div>

      <button className="bg-slate-900 h-12 w-full text-white uppercase border hover:text-slate-900 hover:border-slate-900 hover:bg-transparent hover:ease-in-out hover:delay-10">
        Sign In
      </button>
      <span className="text-neutral-600 text-[15px]">
        Don't have an account?<Link to="/auth/sign-up">Sign Up</Link>
      </span>
    </div>
  );
};

export default SignIn;
