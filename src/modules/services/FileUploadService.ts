import $api from "@/http/intex";
import { AxiosResponse } from "axios";

type fileType = "images" | "documents" | "videos"

export default class FileUploadService {

  static async save(files: FileList, id: number, fileType: fileType): Promise<AxiosResponse> {
    const fileList = new FormData()

    for (let i = 0; i < files.length; ++i) {
      const file = files[i];
      fileList.append('file', file);
    }

    return $api.post(`/storage/${fileType}/${id}`, fileList)
  }
  static async saveOne(file: File, id: number, fileType: fileType): Promise<AxiosResponse> {
    const fileList = new FormData()
    fileList.append('file', file);

    return $api.post(`/storage/${fileType}/${id}`, fileList)
  }

  static async delete(userId: number | string, filename: string, fileType: fileType): Promise<AxiosResponse> {
    return $api.delete(`/storage/${fileType}/${userId}/${filename}`)
  }

  static write(e: AxiosResponse, userId: number, array: string[]) {

    e.data.savedFiles.savedFiles.forEach((e: any) => {
      array.push(`${userId}/${e.savedName}`)
    })
  }
}