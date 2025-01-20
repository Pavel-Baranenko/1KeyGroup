import $api from "@/http/intex";
import { Object } from "../types/Objects";
import { AxiosResponse } from "axios";


export default class ObjectsService {

  static async create(object: Object, id: number): Promise<AxiosResponse<Object[]>> {
    return await $api.post<Object[]>(`/api/objects/${id}`, object)
  }

  static async getAll(): Promise<AxiosResponse<Object[]>> {
    return await $api.get<Object[]>(`/api/objects?limit=20&offset=0`)
  }
  static async getByProfile(id: number): Promise<AxiosResponse<Object[]>> {
    return await $api.get<Object[]>(`/api/objects/by_profile/${id}`)
  }
  static async getById(id: number): Promise<AxiosResponse<Object>> {
    return await $api.get<Object>(`/api/objects/${id}`)
  }

  static async edit(Object: Object): Promise<AxiosResponse<Object>> {
    return await $api.put<Object>(`/api/objects/`, { Object })
  }
  static async delete(objectId?: number) {
    return await $api.delete(`/api/objects/${objectId}`)
  }

}


