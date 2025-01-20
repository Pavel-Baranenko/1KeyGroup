import $api from "@/http/intex";
import { Request } from "./Requests";
import { AxiosResponse } from "axios";


export default class RequestService {
  static async getAllLeads(): Promise<AxiosResponse<Request[]>> {
    return await $api.get<Request[]>('/api/leads')
  }
  static async getLeadsByProfile(profileId: number): Promise<AxiosResponse<Request[]>> {
    return await $api.get<Request[]>(`/api/leads/profile/${profileId}`)
  }
  static async getById(leadId: number): Promise<AxiosResponse<Request>> {
    return await $api.get<Request>(`/api/leads/${leadId}`)
  }
  // static async getAllLead(id: number): Promise<AxiosResponse<Request[]>> {
  //   return await $api.get<Request[]>(`/api/leads/${id}`)
  // }
  static async create(Request: Request): Promise<AxiosResponse<Request[]>> {
    return await $api.post<Request[]>('/api/leads', { Request })
  }
  static async edit(Request: Request): Promise<AxiosResponse<Request[]>> {
    return await $api.put<Request[]>('/api/leads', { Request })
  }
  static async delete(id: number) {
    return await $api.delete<Request[]>(`/api/leads/${id}`)
  }
}


