import { PRODUCT } from "@/types";
import { makeRequest } from "@/utils/makeRequest";

export class CartService {
    access_token;

    constructor() {
        let user = JSON.parse(localStorage.getItem('user')!);
        // console.log("cartService user", user)
        if(user) this.access_token = user.access_token;
    }

    async getCart() {
        return await makeRequest({ 
            endpoint : "/cart/items", 
            headers : { Authorization : `Bearer ${this.access_token}`},
            method : "GET"
        });
    }

    async addOrUpdateCartItem(product: PRODUCT, operation : string) {
        console.log(product)
        return await makeRequest({ endpoint : "/cart/add-update", data : {product, operation}, headers : { Authorization : `Bearer ${this.access_token}`}, method : "POST"});
    }

    async removeCartItem(id: number) {
        return await makeRequest({ endpoint : `/cart/delete/${id}`, headers : { Authorization : `Bearer ${this.access_token}`}, method : "DELETE"});
    }
}

const cartService = new CartService();
export default cartService;