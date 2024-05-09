import conf from "@/conf/conf";
import { SIGNUP_TYPE } from "@/types";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
    }

    async signUp({ email, password, name} : SIGNUP_TYPE){
        // this code only gives the details about user after signUp completed but it will not store the data in database document for save the data of user in document further method saveToUserDB() we have to create
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call login method
                return this.signIn({ email, password});
            } else {
                return userAccount;
            }
        } catch(error){
            console.log(error);
            return false;
        }
    }

    async signIn({ email , password} : { email : string, password : string}) {
        try{
            return await this.account.createEmailPasswordSession(email, password)
        } catch(error){
            console.log(error);
            throw error;
        }
    }

    async logOut(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;