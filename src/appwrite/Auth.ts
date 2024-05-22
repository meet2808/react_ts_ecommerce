import conf from "@/conf/conf";
import { SIGNUP_TYPE } from "@/types";
import { Client, Account, ID, Databases } from "appwrite";

export class AuthService{
    client = new Client();
    databases = new Databases();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async signUp({ email, password, name} : SIGNUP_TYPE){
        // this code only gives the details about user after signUp completed but it will not store the data in database document for save the data of user in document further method saveToUserDB() we have to create
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(!userAccount) throw Error;
            
            return { success : true };
        } catch(error : unknown){
            let errMsg
            if(error.code === 409){
               errMsg = "Email alredy exists."
            } else if(error.code === 400){
                errMsg = "Please enter valid email or password."
            } else {
                errMsg = "Error occured while sign up."
            }
            return { success : false, errMsg }
        }
    }

    // async saveToUserDB(user : {
    //     email : string,
    //     password : string,
    //     name : string
    // }){
    //     try{
    //         const newUser = this.databases.createDocument(
    //             conf.appWriteDatabaseId,
    //             conf.appWriteUsersCollectionId,
    //             ID.unique(),
    //             user
    //         )

    //         return newUser;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    async signIn({ email , password} : { email : string, password : string}) {
        try{
            await this.account.createEmailPasswordSession(email, password)
            return { success : true };
        } catch(error){
            console.log(error);
            return { success : false, error : "Error occured while logged in." };
        }
    }

    async getAccount(){
        try{
            return await this.account.get()
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async logOut(){
        try{
            await this.account.deleteSession("current");
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;