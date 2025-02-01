
export type Commission = {
  cost?: number | null,
  commissionType: string
}

export type characteristics = {
  label: string,
  value: string
}

export type Price = {
  cost?: number,
  currency: string
}

export type Creator = {
  userId: number,
  userAvatar?: string,
  userName: string
}