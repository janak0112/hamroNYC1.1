import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client)
    }


    // CreateAccount

    async createAccount({ userId, email, password, userName }) {
        console.log("auth")
        try {

            const userAccount = await this.account.create(userId, email, password, userName)

            if (userAccount) {
                return this.login(email, password)
            } else {
                return userAccount
            }

        } catch (error) {
            throw error
        }
    }


    // LoginAccount

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }


    // currentUser

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("currentUser Error:-", error)
        }

        return null;
    }

    // LogOut

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("logout error :-", error)
        }
    }
}


const authService = new AuthService();

export default authService