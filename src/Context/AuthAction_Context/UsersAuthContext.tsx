import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { User } from "../../@Types/Type";
import { auth, storage } from "../../Components/Config/Firebase_Auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { errorHandler } from "../Error_Handler/errorCatcher";
import { Navigate, useNavigate } from "react-router";

//!SECTION - Type of Context
type UsersActionAuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userRegister: (
    name: string,
    email: string,
    password: string,
    file: File | null
  ) => Promise<void>;
};

//!SECTION - Init Value to The Context
const initUsersActionAuthContext = {
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
type UsersActionAuthContextProviderProps = {
  children: ReactNode;
};

//!SECTION - Context
export const UsersActionAuthContext = createContext<UsersActionAuthContextType>(
  initUsersActionAuthContext
);

// const navigate = useNavigate();

//!SECTION - Component
export const UsersActionAuthContextProvider = ({
  children,
}: UsersActionAuthContextProviderProps) => {
  const navigateTo = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const userRegister = async (
    name: string,
    email: string,
    password: string,
    file: File | null
  ) => {
    console.log("name, email, password, file", name, email, password, file);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storageRef = ref(storage, `profilePhotos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
      console.log("User registered successfully with profile photo:", user);
      setUser(user);
      navigateTo("/");
    } catch (error) {
      console.error("Error during user registration:", error);
      errorHandler(error);
      setUser(null);
    }
  };
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is Loge in (onAuthStateChanged)");
        setUser(user);
        // if (user.email && user.displayName && user.photoURL) {
        //   setUser({
        //     uid: user.uid,
        //     displayName: user.displayName,
        //     email: user.email,
        //     photoURL: user.photoURL,
        //   });
        // }
      } else {
        console.log("user is not Loge in");
        setUser(null);
      }
    });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    //!SECTION - Component Provider
    <UsersActionAuthContext.Provider value={{ user, setUser, userRegister }}>
      {children}
    </UsersActionAuthContext.Provider>
  );
};
