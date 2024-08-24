import { z } from "zod";

export const signUpSchema = z.object({
    email :  z.string().email({ message : "Invalid email address"}),
    password : z.string().min(6, { message : "Password should contain atleast 6 characters long."}).max(20, { message : "Password should not contain more than 20 characters."}),
    name : z.string({ required_error : "Name is required", invalid_type_error : "Name must be a string"}).min(4, { message : "Name is required"}),
    confirmPassword : z.string().min(6, { message : "Password should contain atleast 6 characters long."}).max(20, { message : "Password should not contain more than 20 characters."}),
}).refine(data => data.password === data.confirmPassword, {
    message : "Password doesn't match",
    path : ["confirmPassword"]
})

export const signInSchema = z.object({
    email :  z.string({ required_error : "Email is required", invalid_type_error : "Email must be a string"}).email({ message : "Invalid email address"}),
    password : z.string({ required_error : "Password is required"}).min(6, { message : "Password should contain atleast 6 characters long."}).max(20, { message : "Password should not contain more than 20 characters."})
})

export const shippingDetailsSchema = z.object({
    residentialDetails : z.string({ 
        required_error : "Residential detail is required", 
        invalid_type_error : "Residential detail must be a string"
    }).trim().min(10, { message : "Please enter your residentail details"}),
    street : z.string({ 
        required_error : "street detail is required", 
        invalid_type_error : "street detail must be a string"
    }).trim().min(10, { message : "Please enter your street details"}),
    landmark : z.string({ 
        required_error : "ladmark detail is required", 
        invalid_type_error : "landmark detail must be a string"
    }).trim().min(5, { message : "Please enter your landmark details"}),
    city : z.string({ required_error : "Please select the city"}).trim().min(1, { message : "Please select your city"}),
    state : z.string({ required_error : "Please select the state"}).trim().min(1, { message : "Please select your state"}),
    pincode : z.string().trim().min(6, { message : "Pincode must be a 6 digit long"}).max(6, { message : "Pincode should not be greater than 6 digits."})
})