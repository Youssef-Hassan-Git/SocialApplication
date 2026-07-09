export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface PostComment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: string | null;
  likes: [];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

export interface Posts {
  id: string;
  body: string;
  bookmarked: boolean;
  commentsCount: number;
  createdAt: string;
  isShare: boolean;
  likes: unknown[];
  likesCount: number;
  privacy: string;
  sharedPost: null;
  sharesCount: number;
  user: User;
  image?: string;
  topComment: PostComment | null;
}