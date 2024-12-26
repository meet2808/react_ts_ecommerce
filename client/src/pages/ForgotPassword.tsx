import { useState } from "react";
import authService from "@/service/Auth";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotPasswordSchema } from "@/schema/schema";
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

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    const { email } = data;

    const response = await authService.forgotPasswordRequest({ email });
    console.log(response);
    // if (!response?.success) {
    //   toast({ title: response?.message });
    //   setIsLoading(false);
    //   return;
    // } else if (response?.success) {
    //   setIsLoading(false);
    //   toast({ title: response?.message });
    // }
    setIsLoading(false);
    toast({ title : response.message });
  };
  return (
    <div className="space-y-3">
      <h1 className="text-center font-bold text-xl">Forgot Password</h1>
      <h1 className="text-md">Enter your email for sending the verification email</h1>
      <Form {...form}>
        <form 
        className="space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}>
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
              <>Submit</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;