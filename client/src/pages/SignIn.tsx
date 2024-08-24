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
    isLoggedIn,
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
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-3 w-[350px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
          <span className="text-neutral-600 text-[15px]">
            Already have an account?<Link to="/auth/sign-up">Sign Up</Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
