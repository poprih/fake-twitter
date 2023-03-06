export type Tweet = {
  id: string,
  content: string,
  userId: number,
  username: string,
  createTime: string,
  updateTime: string
}

export type User = {
  id: number,
  username: string,
  password: string
}
