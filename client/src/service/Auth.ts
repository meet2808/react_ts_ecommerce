import conf from "@/conf/conf";
import axios from 'axios';
import { SIGNUP_TYPE } from "@/types";

export class AuthService {
    async signUp({ email, password, name }: SIGNUP_TYPE) {
        const response = await axios.post(`${conf.dbApi}/users/signup`, { email, password, name });

        if(response?.status !== 200) {
            return { errMsg : response.data, success : false}
        } else if(response?.status === 200) {
            return { data : response.data, success : true}
        }
    }

    async signIn({ email, password }: { email: string, password: string }) {
        const response = await axios.post(`${conf.dbApi}/users/login`, { email, password });
        console.log(response)

        if(response?.status !== 200){
            return { errMsg : response.data, success : false}
        } else if(response?.status === 200){
            return { data : response.data.details, success : true}
        }
    }
}

const authService = new AuthService();

export default authService;