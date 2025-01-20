export interface Request {
  id: number,
  location: {
    city: string[],
    region: string[]
  },
  dealFormat: string,
  propertyType: string,
  propertySubType: string,
  condition: {
    status: string,
    buildingQuarter: number,
    buildingYear: number
  },
  roomsCount: {
    count: string[],
    bedroom: [],
    bathroom: [],
    balcony: []
  },
  square: {
    common: Range,
    living: Range,
    kitchen: Range
  },
  budget: {
    min: number,
    max: number,
    currency: string
  },
  purchaseGoal: string[],
  urgency: string,
  purchaseMethod: string,
  description: string,
  type: string,
  parking: [],
  permits: [],
  storey: [],
  renovation: [],
  convenience: [],
  creator: Creator,
}

export interface Creator {
  id: number,
  name: string,
  avatar: string,
  role: string
}
export interface Range {
  min: number,
  max: number
}