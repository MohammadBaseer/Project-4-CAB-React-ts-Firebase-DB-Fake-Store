import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../../@Types/Type";
import { auth, storage } from "../../components/Config/Firebase_Auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router";

//!SECTION - Type of Context
type UsersActionAuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userRegister: (name: string, email: string, password: string, file: File | null) => Promise<void>;
  errorHandle: string;
  setErrorHandle: (errorHandle: string) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

//!SECTION - Init Value to The Context
const initUsersActionAuthContext = {
  user: null,
  setUser: () => {
    throw new Error("setUser function must be overridden");
  },
  userRegister: () => {
    throw new Error("userRegister function must be overridden");
  },
  errorHandle: "",
  setErrorHandle: () => {
    throw new Error("userRegister function must be overridden");
  },
  isLoading: true,
  setIsLoading: () => {
    throw new Error("setIsLoading function must be overridden");
  },
};

//!SECTION - Props Type
type UsersActionAuthContextProviderProps = {
  children: ReactNode;
};

//!SECTION - Context
export const UsersActionAuthContext = createContext<UsersActionAuthContextType>(initUsersActionAuthContext);

//!SECTION - Component
export const UsersActionAuthContextProvider = ({ children }: UsersActionAuthContextProviderProps) => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorHandle, setErrorHandle] = useState("");

  const userRegister = async (name: string | null, email: string, password: string, file: File | null) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (file) {
        const storageRef = ref(storage, `profilePhotos/${user.uid}`);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);

        await updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        });
      } else {
        await updateProfile(user, {
          displayName: name,
        });
      }

      setUser(user);
      setIsLoading(false);
      navigateTo("/");
    } catch (error: any) {
      setErrorHandle(error?.code);
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    //!SECTION - Component Provider
    <UsersActionAuthContext.Provider value={{ user, setUser, userRegister, errorHandle, setErrorHandle, isLoading, setIsLoading }}>{children}</UsersActionAuthContext.Provider>
  );
};
