export interface UserDataInterface {
  id: number;
  username: string;
  name: string;
  email: string;
  bio: string;
  profileImage: string;
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
  id: number,
  title: string,
  content: string,
  userId: number,
  userName: string,
  categoryId: number,
  categoryName: string,
  clapsCount: number,
  readingTime: number,
  status: true,
  createdAt: string,
  comments: [],
  commentsCount: number
}
