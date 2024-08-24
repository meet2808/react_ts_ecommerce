import { useState, useEffect, useCallback } from "react";
import { Loader } from "@/components";
import conf from "@/conf/conf";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/service/Auth";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/useAuthanticate";
import { useCart } from "@/context/useCart";
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
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shippingDetailsSchema } from "@/schema/schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const ShippingDetails = () => {
  const { user, setUser } = useAuth();
  const userAddress = user?.address;

  const { cart } = useCart();
  const items = cart.items;
  // console.log("user address", userAddress)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");

  const form = useForm<z.infer<typeof shippingDetailsSchema>>({
    resolver: zodResolver(shippingDetailsSchema),
    defaultValues: {
      residentialDetails: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const { watch, setValue, reset } = form;
  const selectedCity = watch("city");

  const onSubmit = async (data: z.infer<typeof shippingDetailsSchema>) => {
    setIsLoading(true);
    // if(!userAddress){
    //   console.log(data);
    // }
    if (JSON.stringify(userAddress) !== JSON.stringify(data)) {
      try{
        const response = await axios.post(`${conf.dbApi}/users/add-shipping-details`)
        if(response.data.success){
          setUser(user.address = response.data.details)
        }
      } catch(error){
        console.log(error);
      }
    } 

    const cartItems = { items }
    await axios
      .post(`${conf.dbApi}/payment/create-checkout-session`, cartItems, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        console.log("response",response)
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err));
    console.log(data);
  };

  useEffect(() => {
    if (userAddress) {
      reset({
        residentialDetails: userAddress.residentialDetails || "",
        street: userAddress.street || "",
        landmark: userAddress.landmark || "",
        state: userAddress.state || "",
        city: userAddress.city || "",
        pincode: userAddress.pincode || "",
      });
      setSelectedState(userAddress.state || "");
    }
  }, [userAddress, reset]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2008/api/v1/list/states"
        );
        if (response.data) setStates(response?.data);
        // console.log("states data", states);
      } catch (error) {
        console.log("getting error while fetching the states", error);
      }
    };
    fetchStates();
  }, []);

  const fetchCities = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:2008/api/v1/list/district/${selectedState}`
      );
      if (response.data) {
        setCities([]);
        setCities(response?.data);
      } else {
        console.log("no data received from cities api.");
      }
      // console.log("states data", cities);
    } catch (error) {
      console.log("getting error while fetching the cities", error);
    }
  }, [selectedState]);

  useEffect(() => {
    selectedState ? fetchCities() : setCities([]);
  }, [selectedState, fetchCities]);

  return (
    <div className="flex flex-col items-center justify-center my-6 space-y-3">
      <h1 className="font-bold text-4xl">Shipping Details</h1>
      <Form {...form}>
        <form
          className="space-y-3 w-[350px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="residentialDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Residential Details</FormLabel>
                <FormControl>
                  <Input placeholder="Residential Details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark</FormLabel>
                <FormControl>
                  <Input placeholder="Landmark" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      setSelectedState(value);
                      field.onChange(value);
                    }}
                    defaultValue={selectedState}
                    value={userAddress.state}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>States</SelectLabel>
                        {states?.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    disabled={selectedState ? false : true}
                    value={userAddress.city}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Cities</SelectLabel>
                        {cities?.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="Pincode" {...field} />
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
                <Loader /> Loading...
              </div>
            ) : (
              <>Submit</>
            )}
          </Button>

          <Button className="w-full bg-slate-950" onClick={() => form.reset()}>
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShippingDetails;
