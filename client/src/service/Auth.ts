import conf from "@/conf/conf";
import axios from 'axios';
import { SIGNUP_TYPE } from "@/types";
export class AuthService {
    async makeRequest(endpoint: string, data: object) {
        try {
            const response = await axios.post(`${conf.dbApi}${endpoint}`, data);
            return {
                success: true,
                data: response.data,
                message : response.data.message
            };
        } catch (error: any) {
            return {
                success: false,
                message : error.response?.data?.message || error.message,
            };
        }
    }

    async signUp({ email, password, name }: SIGNUP_TYPE) {
        return await this.makeRequest("/users/signup", { email, password, name });
    }

    async signIn({ email, password }: { email: string, password: string }) {
        return await this.makeRequest("/users/login", { email, password });
    }

    async forgotPasswordRequest({ email }: { email: string }) {
        return await this.makeRequest("/users/forgotPasswordRequest", { email });
    }

    async changePassword({ email, password} : { email : string, password : string}){
        return await this.makeRequest("/users/changePassword", { email, password });
    }
}

const authService = new AuthService();

export default authService;