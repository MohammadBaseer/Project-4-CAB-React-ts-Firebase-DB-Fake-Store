import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../../@Types/Type";
import { auth, storage } from "../../Components/Config/Firebase_Auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { errorHandler } from "../Error_Handler/errorCatcher";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

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
  // logOut: () => void;
  ///TODO -
  errorHandle: string;
  setErrorHandle: (errorHandle: string) => void;
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
  // logOut: () => {
  //   throw new Error("logOut function must be overridden");
  // },
  ///TODO -
  errorHandle: "",
  setErrorHandle: () => {
    throw new Error("userRegister function must be overridden");
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
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);

  //TODO -
  const [errorHandle, setErrorHandle] = useState("");

  const userRegister = async (
    name: string | null,
    email: string,
    password: string,
    file: File | null
  ) => {
    // console.log("name, email, password, file", name, email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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

      console.log("User registered successfully with profile photo:", user);
      navigateTo("/");
    } catch (error) {
      setErrorHandle(error?.code);
      console.error("Error during user registration:", error);

      setUser(null);
    }
  };

  // useEffect(() => {
  //   const checkUserStatus = () => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUser(user);

  //         const uid = user.uid;

  //         console.log("user is Loge in", user.displayName, "======", uid);
  //         // ...
  //       } else {
  //         console.log("user is not Loge in");
  //         setUser(null);
  //       }
  //     });
  //   };

  //   checkUserStatus();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        console.log("User is logged in:", user.displayName, "UID:", user.uid);
      } else {
        console.log("User is not logged in");
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    //!SECTION - Component Provider
    <UsersActionAuthContext.Provider
      value={{ user, setUser, userRegister, errorHandle, setErrorHandle }}
    >
      {children}
    </UsersActionAuthContext.Provider>
  );
};
