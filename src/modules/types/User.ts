export type User = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  photo: string,
  phoneNumber: string,
  email: string,
  role?: string,
  ownProfiles?: Profile[],
  adminProfiles?: [],
  employeeProfiles?: [],
  jwt?: string
}


export type IUser = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  photo: string,
  phoneNumber: string,
  email: string,
  role: string,
  ownProfiles: Profile[],
  adminProfiles: [],
  employeeProfiles: [],
  jwt: string
}

export interface Profile {
  id: number,
  name?: string,
  description: string,
  photos: string[],
  videos?: string[],
  rating?: number,
  type: string,
  owner?: any,
  admins?: string[],
  employees?: string[],
  created?: string
}