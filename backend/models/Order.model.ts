import mongoose from "mongoose";
import { CART_PRODUCT, OrderDocument } from "../utils/types";

const OrderItemSchema = new mongoose.Schema<CART_PRODUCT>({
    id : { type : Number, require : true},
    title : { type : String, require : true},
    quantity : { type : Number, require : true},
    price : { type : Number, require : true},
    thumbnail : { type : String , require : true},
});

const OrderSchema = new mongoose.Schema<OrderDocument>({
    userId : { type : String, require : true},
    orderItems : [OrderItemSchema],
    totalPrice : { type : Number, require : true},
    address : {
        residentialDetails : { type : String },
        street : { type : String },
        landmark : { type : String },
        city : { type : String },
        state : { type : String },
        pincode : { type : Number }
    }
});

export default mongoose.model("Order", OrderSchema);