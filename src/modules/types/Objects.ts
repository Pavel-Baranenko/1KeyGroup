import { characteristics, Commission, Creator, Price } from "./Common"
import { fileOptions } from "./Files"


export type Condition = {
  status: string,
  buildingQuarter?: number,
  buildingYear?: number
}

export type Object = {
  id?: number
  dealFormat: string,
  propertyType: string,
  propertySubType: string,
  characteristics: characteristics[],
  condition: Condition,
  appointment: string,
  location: {
    address: string,
    range: boolean
  },
  price: Price,
  title: string,
  subTitle: string,
  photos: string[],
  floor?: number,
  square: {
    common?: number,
    living?: number,
    kitchen?: number
  },
  height?: number,
  rooms: {
    count?: number,
    bedroom?: number,
    bathroom?: number
  },
  additional: string[],
  equipment: string[],
  videos: fileOptions[],
  documents: fileOptions[],
  layout: string[],
  status: string,
  building?: number | null,
  territory: {
    square?: number,
    additional: string[],
    layout: string[],
    near: string[],
    view: string[]
  },
  services: string[],
  commission: Commission,
  creator?: number,
  created?: Date,
  updated?: Date,
}