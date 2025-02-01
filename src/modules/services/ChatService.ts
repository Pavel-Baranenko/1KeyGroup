import $api from "@/http/intex";
import { AxiosResponse } from "axios";
import { CahtRoom } from "../types/Chat";



export default class ChatService {

  static async create(chatRoom: CahtRoom): Promise<AxiosResponse<CahtRoom>> {
    return $api.post<CahtRoom>('/api/chat_rooms', chatRoom)
  }
  static async getByuser(): Promise<AxiosResponse<CahtRoom[]>> {
    return $api.get<CahtRoom[]>('/api/chat_rooms')
  }

}