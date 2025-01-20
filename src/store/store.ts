import { API_URL } from "@/http/intex";
import { AuthResponse } from "@/modules/types/Auth";
import { IUser } from "@/modules/types/User";
import AuthService from "@/modules/services/AuthService";
import axios from "axios";
import { makeAutoObservable } from "mobx";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: IUser) {
    this.user = user;
  }
  async login(username: string, password: string) {
    try {
      const response = await AuthService.login(username, password)
      localStorage.setItem('jwt', response.data.jwt)
      localStorage.setItem('user_id', JSON.stringify(response.data.id))
      this.setAuth(true)
      this.setUser(response.data)
      return false;
    } catch (e: any) {
      return e.response?.data?.message
    }
  }
  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/api/users/${Number(localStorage.getItem('user_id'))}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } })
      this.setAuth(true)
      this.setUser(response.data)

    } catch (e) {
      console.log(e);
    }
  }

}

export const RootStore = {
  Store,
};
