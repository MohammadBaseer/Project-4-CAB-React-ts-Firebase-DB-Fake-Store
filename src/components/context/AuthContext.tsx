import {onAuthStateChanged,signOut,} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth,} from "../firebase/Auth";
import { User } from "../@types/Types";
import { userRegistration } from "./authServices";

//!SECTION - Type of Context
type authContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userRegister: (
    displayName: string,
    email: string,
    password: string,
    file: string
  ) => Promise<void>;
  logOut: () => void;
};

//!SECTION - Init Value to The Context
const initAuthContext = {
  user: {} as User,
  setUser: () => {
    throw new Error("Error has been occur");
  },
  userRegister: () => {
    throw new Error("Error has been occur");
  },
  logOut: () => {
    throw new Error("Error has been occur");
  },
};

//!SECTION - Props Type
type authContextProviderProps = {
  children: ReactNode;
};

//!SECTION - Context
export const AuthContext = createContext<authContextType>(initAuthContext);

//!SECTION - Component
export const AuthContextProvider = ({ children }: authContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
console.log("user=================== to set to state ", user)

//!SECTION LogOut
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log(" Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.log("Logout", error);
      });
  };

  //!SECTION User Register to Firebase 
  const userRegister = async ( displayName: string, email: string, password: string, file: any) => {
    await userRegistration(displayName, email, password, file);
  };
  //!SECTION User Status check if online

  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is Loge in");
        if (user.email && user.displayName && user.photoURL) {
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
        }
      } else {
        console.log("user is not Loge in");
      }
    });
  };
  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    //!SECTION - Component Provider
    <AuthContext.Provider
      value={{ user, setUser, userRegister, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
