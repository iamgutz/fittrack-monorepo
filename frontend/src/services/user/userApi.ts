import { gql } from "@apollo/client";
import BaseApi from "../../api/baseApi";

export interface User {
    uid: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

class UserApi extends BaseApi {
    async fetchUser(uid: string): Promise<User> {
        const response = await this.query(gql`
            query($uid: ID!) { 
                user (userId: $uid) { 
                    id
                    username
                    firstName
                    lastName
                } 
            }
        `, { uid });

        return response.data.user;
    }
}

export default UserApi;