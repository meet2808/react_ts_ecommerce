import mongoose from "mongoose";
import { CART_PRODUCT, CartDocument } from "../utils/types";

const CartItemSchema = new mongoose.Schema<CART_PRODUCT>({
    id : { type : Number, require : true},
    title : { type : String, require : true},
    quantity : { type : Number, require : true},
    price : { type : Number, require : true},
    thumbnail : { type : String , require : true},
});

const CartSchema = new mongoose.Schema<CartDocument>({
    userId : { type : String, require : true, unique : true},
    cartItems : [CartItemSchema]
});

export default mongoose.model("Cart", CartSchema);