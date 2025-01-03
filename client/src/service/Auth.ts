import { SIGNUP_TYPE, ADDRESS_TYPE } from "@/types";
import { makeRequest } from "@/utils/makeRequest";
export class AuthService {
    access_token;

    constructor() {
        let user = JSON.parse(localStorage.getItem('user')!);
        // console.log("cartService user", user)
        if (user) this.access_token = user.access_token;
    }

    async signUp({ email, password, name }: SIGNUP_TYPE) {
        return await makeRequest({ endpoint: "/users/signup", method: "POST", data: { email, password, name } });
    }

    async signIn({ email, password }: { email: string, password: string }) {
        return await makeRequest({ endpoint: "/users/login", method: "POST", data: { email, password } });
    }

    async forgotPasswordRequest({ email }: { email: string }) {
        return await makeRequest({ endpoint: "/users/forgotPasswordRequest", method: "POST", data: { email } });
    }

    async changePassword({ email, password }: { email: string, password: string }) {
        return await makeRequest({ endpoint: "/users/changePassword", method: "POST", data: { email, password } });
    }

    async setShippingDetsils({ data }: { data: ADDRESS_TYPE }) {
        return await makeRequest({ endpoint: "/users/add-shipping-details", method: "POST", data, headers: { Authorization: `Bearer ${this.access_token}` } })
    }
}

const authService = new AuthService();

export default authService;