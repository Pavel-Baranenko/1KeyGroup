import $api from "@/http/intex";
import { Profile, User } from "../types/User";
import { AxiosResponse } from "axios";


export default class {
  static async createProfile(Profile: Profile): Promise<AxiosResponse<Profile>> {
    return await $api.post<Profile>('/api/profiles', Profile)
  }
  static async editProfile(Profile: Profile): Promise<AxiosResponse<Profile>> {
    return await $api.put<Profile>('/api/profiles', Profile)
  }
  static async getProfileById(profileId: number): Promise<AxiosResponse<Profile>> {
    return await $api.get<Profile>(`/api/profiles/${profileId}`)
  }
  static async getUserById(userId: number): Promise<AxiosResponse<User>> {
    return await $api.get<User>(`/api/users/${userId}`)
  }
  static async updateUserById(user: User): Promise<AxiosResponse<User>> {
    return await $api.put<User>(`/api/users/`, user)
  }
}


