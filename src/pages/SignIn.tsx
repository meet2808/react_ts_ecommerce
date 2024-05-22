import { Input, Loader } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { LData } from "@/types";
import authService from "@/appwrite/Auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/context/useAuthanticate";
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading, setIsLoggedIn, setIsLoading, isLoggedIn, checkAuthUser } =
    useAuth();
  const { register, handleSubmit, reset } = useForm<LData>();

  const onSubmit: SubmitHandler<LData> = async (data) => {
    setIsLoading(true);
    let { email, pw } = data;
    let password = pw;
    const session = await authService.signIn({ email, password });

    if (!session?.success) {
      toast({ title: "Logged in Failed. Please try again." });
      setIsLoading(false);
      return;
    }

    const loggedIn = await checkAuthUser();

    if (loggedIn) navigate("/");
    else toast({ title: "Logged in Failed. Please try again." });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] px-[5px] py-[10px]"
    >
      <h1 className="text-[30px] font-bold uppercase text-center">Sign In</h1>
      <div className="py-1">
        <Input
          type={"email"}
          label="Email"
          errors={"Please enter your email"}
          value={"email"}
          placeholder={"Email"}
          hasError={false}
          register={register}
        />

        <Input
          type={"password"}
          label="Password"
          errors={"Please enter your password"}
          value={"pw"}
          placeholder={"Password"}
          hasError={false}
          register={register}
        />
      </div>

      <button
        disabled={isLoading ? true : false}
        className="bg-slate-900 h-12 w-full text-white uppercase border hover:text-slate-900 hover:border-slate-900 hover:bg-transparent hover:ease-in-out hover:delay-10"
      >
        {isLoading ? (
          <div className="flex flex-row justify-center items-center gap-3 capitalize">
            <Loader /> Loading ...
          </div>
        ) : (
          <>Sign In</>
        )}
      </button>
      <span className="text-neutral-600 text-[15px]">
        Don't have an account?<Link to="/auth/sign-up">Sign Up</Link>
      </span>
    </form>
  );
};

export default SignIn;
