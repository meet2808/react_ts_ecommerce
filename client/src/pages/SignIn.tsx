import { Loader } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/service/Auth";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/useAuthanticate";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schema/schema";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    isLoading,
    setIsLoggedIn,
    setIsLoading,
    setIsAuthenticated,
    setUser,
  } = useAuth();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const { email, password } = data;

    const response = await authService.signIn({ email, password });
    // console.log(response);

    if (!response?.success) {
      toast({ title: "Logged in Failed. Please try again." });
      setIsLoading(false);
      return;
    } else if (response?.success) {
      setIsLoggedIn(true);
      setIsLoading(false);
      setIsAuthenticated(true);
      setUser(response?.data?.details);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    setIsLoading(false);
  };

  return (
    <div className="m-auto my-12 md:my-22 lg:my-16 w-[350px]">
      {/* <h1 className="font-bold text-3xl text-center mb-4">Productmart</h1> */}
      <h1 className="font-bold text-xl text-center">Sign In</h1>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full"
            type="submit"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <div className="flex flex-row justify-center items-center gap-3 capitalize">
                <Loader width={20} height={20} /> Loading...
              </div>
            ) : (
              <>Sign In</>
            )}
          </Button>
          <span className="text-neutral-600 text-[14px]">
            Don't have an account?<Link to="/auth/sign-up">Sign Up</Link>
          </span>
          <br />
          <span className="text-neutral-600 text-[13px]">
            <Link to="/forgotPassword">Forgot Password ?</Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
