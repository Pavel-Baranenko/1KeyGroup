
export type CahtRoom = {
  id?: number,
  name: string,
  type: string,
  chatUsers?: number[],
  invitedUsers?: invitedUser[]
}

export type invitedUser = {
  id?: number,
  username?: string
}
