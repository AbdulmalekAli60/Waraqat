"use client"
import { createContext, useContext, useState } from "react";
import { UserDataInterface, UserContextType } from "@/Interfaces/UserContextInterface";

const userContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({children}: {children:React.ReactNode}) {

    const [userData,setUserData] = useState<UserDataInterface>({
        id: 0,
        username: "",
        bio: "",
        profileImage: "",
        created_at: "",
    })

    return (
        <userContext.Provider value={{userData,setUserData}}>
            <div>
                {children}
            </div>
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