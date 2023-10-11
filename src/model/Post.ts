import { User } from "./User";

export interface Post {
  postId: number,
  User: User,
  content: string,
  Images: Array<{ link: string }>
}