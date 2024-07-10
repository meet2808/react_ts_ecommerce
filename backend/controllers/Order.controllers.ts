import { Z_DATA_ERROR } from "zlib";
import Cart from "../models/Cart.model";
import Order from "../models/Order.model";
import { Request, Response } from "express";

export const placeOrder = async (req: Request, res: Response) => {
    const { items, totalPrice, userId } = req.body;
    console.log(req.params.userId)
    try {
        const newOrder = new Order({ userId, orderItems : items, totalPrice });
        await newOrder.save();

        await Cart.findOneAndUpdate(
            { userId },
            { $set: { cartItems: [] } }
        );
        res.status(201).json({ order : newOrder})
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    const { userId } = req.params;
    console.log(req.params.userId)
    try {
        const orders = await Order.find({ userId : userId});
        return res.status(200).json({ data: orders });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error occured while getting orders." });
    }
}