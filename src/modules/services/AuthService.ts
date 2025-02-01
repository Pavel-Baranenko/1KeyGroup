import $api, { API_URL } from "@/http/intex";
import { AuthResponse } from "../types/Auth";
import axios, { AxiosResponse } from "axios";



export default class AuthService {

  static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { username, password }, {
      headers: {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
      }
    })
  }

  static async verificationCode(phoneNumber: string | undefined, type: string): Promise<AxiosResponse> {
    return axios.post(`${API_URL}/auth/verify_phone`, { phoneNumber, type })
  }

}