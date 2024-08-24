import conf from "@/conf/conf";
import axios from "axios";
import { ORDER } from "@/types";

export class OrderService {
    access_token;

    constructor() {
        let user = JSON.parse(localStorage.getItem('user')!);
        this.access_token = user.access_token;
    }

    async placeOrder(data : ORDER) {
        console.log("place order data",data)
        const response = await axios.post(`${conf.dbApi}/order/new`, data, {
            headers: {
                Authorization: `Bearer ${this.access_token}`
            }
        })
        return response.data;
    }

    async fetchAllOrders(userId : string) {
        // console.log("id",userId)
        if(userId){
            const response = await axios.get(`${conf.dbApi}/order/${userId}/all`,{
                headers: {
                    Authorization: `Bearer ${this.access_token}`
                }
            })
            // console.log(response)
            return response.data;
        }
    }
}

const orderService = new OrderService();

export default orderService;