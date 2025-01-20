import { Profile } from "./User"

export interface AuthCodeResponse {
  message: string
}
export interface AuthResponse {
  type: string,
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  photo: string,
  phoneNumber: string,
  email: string,
  role: string,//USER | ADMIN
  ownProfiles: Profile[],
  adminProfiles: [],
  employeeProfiles: [],
  jwt: string
}

