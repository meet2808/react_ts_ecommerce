import axios from "axios";
import conf from "@/conf/conf"

export const getProducts = async (category: string) => {
    console.log(category)
    if (category === "all") {
        const categories = ["mens-shirts", "laptops", "womens-bags", "mens-shoes", "mens-watches", "sunglasses"];

        try {
            // Create an array of promises for each category
            const productPromises = categories.map(cat => axios.get(`${conf.apiUrl}/category/${cat}`));
            
            // Wait for all promises to resolve
            const productResponses = await Promise.all(productPromises);

            // Combine the products from all responses
            const allProducts = productResponses.flatMap(response => response.data.products);

            return allProducts;
        } catch (error) {
            console.log(error);
            return error;
        }
    } else if (category !== "" || category == "mens-shirts" || category == "laptops" || category == "womens-bags" || category == "mens-shoes" || category == "mens-watches" || category == "sunglasses") {

        try {
            const response = await axios.get(`${conf.apiUrl}/category/${category}`);
            return response.data.products;
        } catch (error) {
            console.error(`Error fetching products for category ${category}:`, error);
            throw error;
        }
    }
}