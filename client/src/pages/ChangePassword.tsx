import { useState } from "react";
import { Loader } from "@/components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "@/service/Auth";
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
import { changePasswordSchema } from "@/schema/schema";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data : z.infer<typeof changePasswordSchema>) => {
    setIsLoading(true);
    const { email, password } = data;

    const response = await authService.changePassword({ email, password });
    toast({ title : response.message});
    setIsLoading(false);
    if(response.success) {
        setTimeout(() => { navigate("/auth/sign-in")}, 2000)
    }
  }

  return <div>
    <h1 className="font-bold text-xl text-center">Change Password</h1>
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
              <>Submit</>
            )}
          </Button>
        </form>
    </Form>
  </div>;
};

export default ChangePassword;
