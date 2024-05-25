import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/Auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

//!SECTION - Type of useState
type user = {
    uid:string;
  name: string;
  email: string;

};

//!SECTION - Type of Context
type authContextType = {
  user: user | null;
  setUser: (user: user | null) => void;
  //NOTE this is userLogin function types
  errorHandle: string;
  userLogin: (userEmail: string,userPassword: string) => Promise<void>;
  //NOTE this is userRegister function types
  userRegister: (displayName:string, email:string, password:string, file:string) => Promise<void>;


//REVIEW - for test 
// user:User;

//
logOut: () => void

};

//!SECTION - Init Value to The Context
const initAuthContext = {
    user: {} as user,
  setUser: () => {
    throw new Error("Error has been occur");
  },
   //NOTE this is userLogin function init Value
   errorHandle:"",
  userLogin: () => {
    throw new Error("Error has been occur");
  },
  userRegister: () => {
    throw new Error("Error has been occur");
  },
  logOut:() => {
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


    // const navigate = useNavigate();

//NOTE - user Check (now it locally working)
  const [user, setUser] = useState<user | null>(null);
//









//FIXME - Error Handling should fixe
const logOut = () => {
  signOut(auth)
    .then(() => {
      setUser(null);
      console.log(" Sign-out successful.");
    })
    .catch((error) => {
      // An error happened.
    });
};











//!SECTION Error State init here
const [errorHandle, setErrorHandle] = useState<string>("");

//!SECTION User Register to Firebase
//NOTE 

const userRegister = async(displayName:string, email:string, password:string, file:any) => {
  
    try {
        // Auth user registration
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        // Register three observers:
        uploadTask.on(
          (error: any) => {
            setErrorHandle(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
  
              // Add a new document in collection "users" to Firestore
              await setDoc(doc(db, 'users', res.user.uid), {
                id: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              // End
              await setDoc(doc(db, 'userChats', res.user.uid),{})
            });
          }
        );
  console.log("User registration success")
        // Redirect to login page
        // navigate('/');
       
        // End
      } catch (error) {
        const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorHandle(errorCode);
      }
}




//! ==========================



//!SECTION User Login to Firebase
//NOTE 


const userLogin = async (userEmail: string, userPassword: string) => {
  await signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;

// 
if (userCredential.user.email && userCredential.user.displayName) { // check if not null
const uid = userCredential.user.uid;
const name =userCredential.user.displayName;
const email = userCredential.user.email

    setUser({uid, name, email});
}
    console.log("================= > user ", user)




// console.log("==========user============", user.displayName, user.uid, user.email)


// const navigate = useNavigate();
//       navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode, errorMessage);
      setErrorHandle(errorCode);
    });
};

//! ==========================

//!SECTION User Status check if online 

const checkUserStatus = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {

      
      // const uid = user.uid;
      console.log("user is Loge in")
      if (user.email && user.displayName) {
        
        setUser({uid:user.uid, name:user.displayName, email:user.email })
      }
      // ...
    } else {
      console.log("user is not Loge in")

      // User is signed out
      // ...
    }
  });
}

useEffect(() => {
  checkUserStatus()
}, [])

  return (


    //!SECTION - Component Provider
    <AuthContext.Provider value={{ user, setUser, userLogin, errorHandle, userRegister, logOut }}>
      {children}
    </AuthContext.Provider>



  );
};
