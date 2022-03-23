import { Author } from "./Author";

export interface Comment {
  _id: string;
  story: string;
  author: Author;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
