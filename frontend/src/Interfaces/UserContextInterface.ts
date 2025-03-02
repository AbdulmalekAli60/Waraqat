export interface UserDataInterface {
  id: number;
  username: string;
  name: string;
  email: string;
  bio: string;
  profileImage: string | undefined;
  created_at: string;

  followers: number;
  following: number;

  articlesCount: number;
}

export interface UserContextType {
  currentUser: UserDataInterface;
  setCurrentUser: (user: UserDataInterface) => void;
}

export interface UpdatedProfileData {
  id: number;
  name: string;
  username: string;
  email: string;
  bio: string;
  profileImage: string;
}

export interface getAllUsersInterface {
  id: number;
  name: string;
  username: string;
  profileImage: null;

  doIFollowThisUser: boolean;
}

export interface getAllFollowingInterface {
  userId: number;
  name: string;
  username: string;
  profileImage: undefined;

  following: boolean;
}

export interface getAllCategoriesInterface {
  id: number;
  name: string;
  description: string;
}

export interface ArticleInterface {
  title: string;
  content: string;
  userId: number;
  categoryId: number | null;
  // articleImages: [{ imageURL: string }];
}

export interface GetArticles {
  id: number;
  title: string;
  content: string;
  userId: number;
  userName: string;
  categoryId: number;
  categoryName: string;
  clapsCount: number;
  readingTime: number;
  status: boolean;
  createdAt: string;
  comments: [];
  commentsCount: number;
  bookmarksCount?: number;
  allBookmarks: {
    primaryKey: {
      user: number;
      articles: number;
    };
  }[];
  bookmarked: boolean;
}

export interface writeCommentInterface {
  articleId: number;
  userId: number;
  content: string | null;
}

export interface writeCommentResponse {
  
    id: number,
    userId: number,
    articleId: number,
    parentCommentId: null,
    content: string,
    clapsCount: null,
    createdAt: number,

     profileImage:string;
     username: string;
}

export interface CommentsInterface {
  text: string;
  commentsCount: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setCommentCount: React.Dispatch<React.SetStateAction<GetArticles | null>>
}
