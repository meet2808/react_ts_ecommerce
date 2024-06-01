import conf from "@/conf/conf";
import { PRODUCT } from "@/types";
import axios from "axios";

export class CartService {
    access_token;

    constructor() {
        let user = JSON.parse(localStorage.getItem('user')!);
        this.access_token = user.access_token;
    }


    async getCart() {
        const response = await axios.get(`${conf.dbApi}/cart/items`, {
            headers: {
                Authorization: `Bearer ${this.access_token}`
            }
        });
        return response.data;
    }

    async addOrUpdateCartItem(product: PRODUCT) {
        const response = await axios.post(`${conf.dbApi}/cart/add-update`, product, {
            headers: {
                Authorization: `Bearer ${this.access_token}`
            }
        }); 
        return response.data;
    }

    async removeCartItem(id: number) {
        const response = await axios.delete(`${conf.dbApi}/cart/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${this.access_token}`
            }
        });
        return response.data;
    }

}

const cartService = new CartService();

export default cartService;