import {User} from "./User";
import {PostImage} from "./PostImage";

export interface Post {
  postId: number,
  User: User,
  content: string,
  createdAt: Date,
  Images?: Array<PostImage>
  likeCount?: number;
  liked?: boolean,
  commentCount?: number,
  commented?: boolean,
  repostCount?: number,
  reposted?: boolean,
  Repost: Post
}