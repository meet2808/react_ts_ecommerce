import { Input, Loader } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IData, SIGNUP_TYPE } from "@/types";
import authService from "@/service/Auth";
import { useAuth } from "@/context/useAuthanticate";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsLoading, isLoading } = useAuth();
  const { register, handleSubmit, reset } = useForm<IData>();

  const onSubmit: SubmitHandler<IData> = async (data) => {
    setIsLoading(true);
  
    if (data.pw.length >= 8 && data.pw === data.cp) {
      let { name, pw, email } = data;
      let password = pw;
      const response = await authService.signUp({ name, email, password });
      console.log(response);

      if (response?.success === false) {
        toast({ variant: "destructive", title: response?.errMsg });
      } else if(response?.success){
        toast({ title : "Registered successfully."});
        navigate("/auth/sign-in");
      }
      setIsLoading(false);
    } else {
      if(data.pw.length < 8){
        toast({ title : "Password must be minimum 8 char long."})
      }

      if(data.pw !== data.cp){
        toast({ title : "Password doesn't match try again."})
      }

      setIsLoading(false);
    }
    reset();
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
        disabled={isLoading ? true : false}
        className="bg-slate-900 h-12 w-full text-white uppercase border hover:text-slate-900 hover:border-slate-900 hover:bg-transparent hover:ease-in-out hover:delay-10"
      >
        {isLoading ? (
          <div className="flex flex-row justify-center items-center gap-3 capitalize">
            <Loader /> Loading...
          </div>
        ) : (
          <>Sign Up</>
        )}
      </button>
      <span className="text-neutral-600 text-[15px]">
        Already have an account?<Link to="/auth/sign-in">Sign In</Link>
      </span>
    </form>
  );
};

export default SignUp;
