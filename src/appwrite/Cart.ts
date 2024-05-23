import conf from "@/conf/conf";
import { Client, Account, ID, Databases, Query } from "appwrite";

export class CartService {
    client = new Client();
    databases = new Databases();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async getCart(userId: string) {
        try {
            const response = await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCartCollectionId, [
                Query.equal('userId', userId)
            ]);
            return response.documents[0]; // Assuming one cart per user
        } catch (error) {
            console.log(error);
            throw new Error("Error occurred while fetching cart.");
        }
    }

    async addOrUpdateCartItem(userId: string, productId: string, quantity: number) {
        try {
            let cart = await this.getCart(userId);

            if (cart) {
                // Cart exists, update or add the product
                const existingProduct = cart.products.find((p: { productId: string }) => p.productId === productId);

                if (existingProduct) {
                    // Update quantity of existing product
                    existingProduct.quantity += quantity;
                } else {
                    // Add new product to the cart
                    cart.products.push({ productId, quantity });
                }

                await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCartCollectionId, cart.$id, { products: cart.products });
            } else {
                // Cart does not exist, create a new one
                const newCart = await this.databases.createDocument(conf.appWriteDatabaseId, conf.appWriteCartCollectionId, ID.unique(), {
                    userId,
                    products: [{ productId, quantity }]
                });
                return newCart;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error occurred while adding or updating cart item.");
        }
    }
}

const cartService = new CartService();

export default cartService;