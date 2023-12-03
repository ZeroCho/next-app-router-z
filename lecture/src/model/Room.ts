import {User} from "@/model/User";

export interface Room {
  room: string,
  Receiver: User,
  Sender: User,
  content: string,
  createdAt: Date,
}