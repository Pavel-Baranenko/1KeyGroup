import axios, { AxiosResponse } from "axios";

const session_token = '0eb980ab-92a6-4291-8947-b21cfc808219'
const access_token = 'pk.eyJ1IjoiMWtleSIsImEiOiJjbTM2YTJ1NHYwMjU0MmtyM2t1cDdtNDB3In0.bwB-LDiE1zTuh4p1UW23-w'


export default class MapsService {

  static async search(search_text: string, language: string = 'en'): Promise<AxiosResponse> {
    return axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${search_text}&language=${language}&session_token=${session_token}&access_token=${access_token}`)
  }

  static async getPosition(mapbox_id: string, language: string = 'en'): Promise<AxiosResponse> {
    return axios.get(`https://api.mapbox.com/search/searchbox/v1/retrieve/${mapbox_id}?language=${language}&session_token=${session_token}&access_token=${access_token}`)
  }

}
