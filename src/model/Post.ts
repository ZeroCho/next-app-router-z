import {User} from "./User";

export interface Post {
  postId: number,
  User: User,
  content: string,
  createdAt: Date,
  Images: Array<{ link: string }>
  likeCount?: number;
  liked?: boolean,
  commentCount?: number,
  commented?: boolean,
  repostCount?: number,
  reposted?: boolean,
  Repost: Post
}