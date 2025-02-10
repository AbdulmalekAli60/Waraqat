"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { UserDataInterface, UserContextType } from "@/Interfaces/UserContextInterface";

const userContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({children}: {children:React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<UserDataInterface>(() => {
        if (typeof window !== "undefined") {
          const savedUser = sessionStorage.getItem("userData");
          return savedUser ? JSON.parse(savedUser) : {
            id: 0,
            username: "",
            name: "",
            email:"",
            bio: "",
            profileImage: "",
            created_at: "",
          };
        }
        return { /* default empty user */ };
      });
    
      // Save to sessionStorage whenever currentUser changes
      useEffect(() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("userData", JSON.stringify(currentUser));
        }
      }, [currentUser]);

      return (
        <userContext.Provider value={{ currentUser, setCurrentUser }}>
          {children}
        </userContext.Provider>
      );
}

export function useUserInfo(){
    const context = useContext(userContext);

    if(context === undefined){
        throw new Error("User data are not stored in the context")
    }
    return context;
}