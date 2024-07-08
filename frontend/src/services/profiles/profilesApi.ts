import { gql } from '@apollo/client';
import BaseApi from '../../api/baseApi';

export interface Profile {
  id: string;
  name: string;
  birthdate: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

class ProfilesApi extends BaseApi {
  async fetchProfilesByUserId(uid: string): Promise<Profile[]> {
    const response = await this.query(
      gql`
            query($uid: ID!) { 
                profiles (userId: $uid) { 
                    id,
                    name,
                    gender,
                    birthdate,
                    createdAt,
                    updatedAt,
                    owner {
                        id
                    }
                } 
            }
        `,
      { uid },
    );

    return response.data.profiles;
  }
}

export default ProfilesApi;
