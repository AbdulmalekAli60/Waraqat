export interface UserDataInterface {
  id: number;
  username: string;
  name: string;
  email: string;
  bio: string;
  profileImage: string;
  created_at: string;
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
