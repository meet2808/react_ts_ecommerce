import { Input } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { IData, SIGNUP_TYPE } from "@/types";
import { useAuth } from "@/hooks/useAuthanticate";
import authService from "@/appwrite/Auth";

const SignUp = () => {
  const { register, handleSubmit } = useForm<IData>();
  const onSubmit: SubmitHandler<IData> = async (data) => {
    console.log(data);
    if (data.pw === data.cp) {
      let { name, pw, email } = data;
      let password = pw;
      const user = await authService.signUp({ name, email, password });
      console.log(user);
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] px-[5px] py-[10px]"
    >
      <h1 className="text-[30px] font-bold uppercase text-center">Sign Up</h1>

      <div className="py-1">
        <Input
          type={"text"}
          label="Name"
          errors={"Please enter your Name"}
          placeholder={"Name"}
          hasError={false}
          value={"name"}
          register={register}
        />

        <Input
          type={"email"}
          label="Email"
          errors={"Please enter your email"}
          placeholder={"Email"}
          hasError={false}
          value={"email"}
          register={register}
        />

        <Input
          type={"password"}
          label="Password"
          errors={"Please enter your password"}
          placeholder={"Password"}
          hasError={false}
          value={"pw"}
          register={register}
        />

        <Input
          type={"password"}
          label="Confirm Password"
          errors={"Please re-enter your password"}
          placeholder={"Re-enter Password"}
          hasError={false}
          value={"cp"}
          register={register}
        />
      </div>

      <button
        type="submit"
        className="bg-slate-900 h-12 w-full text-white uppercase border hover:text-slate-900 hover:border-slate-900 hover:bg-transparent hover:ease-in-out hover:delay-10"
      >
        Sign Up
      </button>
      <span className="text-neutral-600 text-[15px]">
        Already have an account?<Link to="/auth/sign-in">Sign In</Link>
      </span>
    </form>
  );
};

export default SignUp;
