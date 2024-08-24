import { Loader } from "@/components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/service/Auth";
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
import { signUpSchema } from "@/schema/schema";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsLoading, isLoading } = useAuth();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    const { name, email, password } = data;

    const response = await authService.signUp({ name, email, password });
    console.log(response);

    if (response?.success === false) {
      toast({ variant: "destructive", title: response?.errMsg });
    } else if (response?.success) {
      toast({ title: "Registered successfully." });
      navigate("/auth/sign-in");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3 w-[350px]" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={isLoading ? true : false}>
            {isLoading ? (
              <div className="flex flex-row justify-center items-center gap-3 capitalize">
                <Loader width={20} height={20} /> Loading...
              </div>
            ) : (
              <>Sign Up</>
            )}
          </Button>
          <span className="text-neutral-600 text-[15px]">
          Already have an account?<Link to="/auth/sign-in">Sign In</Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;