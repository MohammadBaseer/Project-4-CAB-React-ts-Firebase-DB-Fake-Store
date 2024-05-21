import { ReactNode, createContext, useState } from "react";

type userType ={
    user: string,
    email: string
}

type authContextType ={
    user: userType | null;
    setUser: (user: userType | null) => void;
}

const initAuthContext  = {
    user: {} as userType,
    setUser: () => {throw new Error("Error has been occur");
    }
}

type authContextProviderProps = {
children: ReactNode
}



export const AuthContext = createContext<authContextType>(initAuthContext)



export const AuthContextProvider = ({children}:authContextProviderProps) => {
  
    const [user, setUser] = useState<userType | null>(null)

    return(
        <AuthContext.Provider value={{user, setUser}}>
{children}
        </AuthContext.Provider>
    )
}