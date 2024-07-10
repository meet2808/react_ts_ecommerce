import Cart from "../models/Cart.model"
import { Request, Response } from "express";
import { CART_PRODUCT, CartDocument } from "../utils/types"

export const addUpdateCart = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { id, title, quantity, price, thumbnail } = req.body;

    try {
        var cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) {
            cart = new Cart({ userId, cartItems: [] });
        }

        const existingItemIndex = cart.cartItems.findIndex((item) => item.id === id);

        if (existingItemIndex >= 0) {
            // Update existing item
            cart.cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.cartItems.push({ id, title, quantity, price, thumbnail });
        }

        await cart.save();
        return res.status(200).json({ data: cart });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error occured while update or add product in cart." });
    }
}

export const getCartItems = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteItemFromCart = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const removeProductId = req.params.id;

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { cartItems: { id: removeProductId } } },
            { new : true }
        )

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ data: updatedCart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}