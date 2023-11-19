import { User } from "./User";
import {PostImage} from "@/model/PostImage";

interface UserID {
  userId: string,
}

export interface Post {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[],
  Hearts: UserID[],
  Reposts: UserID[],
  Comments: UserID[],
  _count: {
    Hearts: number,
    Reposts: number,
    Comments: number,
  },
  Original?: Post; // 재게시
  Parent?: Post; // 답글
}