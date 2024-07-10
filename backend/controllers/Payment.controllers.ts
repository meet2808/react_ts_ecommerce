import { Request, Response } from "express";
import Stripe from "stripe";
import {conf} from "../conf"

const stripe = new Stripe(conf.STRIPE_KEY)
export const handlePayment = async (req: Request, res: Response) => {
    const { items } = req.body;

    const line_items = items.map((item : any) => {
        return {
            price_data : {
                currency : "inr",
                product_data : {
                    name : item.title,
                    images : [item.thumbnail],
                },
                unit_amount : Math.round(item.price * 100)
            },
            quantity : item.quantity
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode : 'payment',
        payment_method_types: ['card'],
        success_url : "http://localhost:5173/success",
        cancel_url : "http://localhost:5173/cancel"
    })
    console.log(session)
    res.send({ url: session.url });
}
