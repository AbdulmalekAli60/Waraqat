export interface UserDataInterface {
    id: number;
    username: string;
    bio: string;
    profileImage: string;
    created_at: string;
  }

  export interface UserContextType {
    userData:UserDataInterface,
    setUserData: (data:UserDataInterface) => void,
  }