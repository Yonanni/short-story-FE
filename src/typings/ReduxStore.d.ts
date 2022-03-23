import { Author } from "./Author";
import { Story } from "./Story";
import { Comment } from "./Comment";

export interface Authors {
  data: Author[];
  loading: boolean;
  error: string;
}

export interface SingleAuthor {
  data: Author | null;
  loading: boolean;
  error: string;
}

export interface Stories {
  data: Story[];
  loading: boolean;
  error: string;
}

export interface SingleStory {
  data: Story | null;
  loading: boolean;
  error: string;
}

export interface Comments {
  data: Comment[];
  loading: boolean;
  error: string;
}

export interface SingleComment {
  data: Comment | null;
  loading: boolean;
  error: string;
}

export interface AuthorizationHeader {
  config: {
    headers: {
      Authorization: string;
    };
  };
  loading: boolean;
  error: string;
}

export interface ReduxStore {
  me: SingleAuthor;
  authors: Authors;
  author: SingleAuthor;
  stories: Stories;
  myStories: Stories;
  heartedStories: Stories;
  authorStories: Stories;
  randomStory: SingleStory;
  story: SingleStory;
  comments: Comments;
  comment: SingleComment;
  authorizationHeader: AuthorizationHeader;
}
