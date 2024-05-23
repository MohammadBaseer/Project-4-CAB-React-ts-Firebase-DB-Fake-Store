import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { ReactNode, createContext, useState } from "react";
import { auth, db, storage } from "../firebase/Auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

//!SECTION - Type of useState
type userType = {
    id:string;
  name: string | null;
  email: string | null

};

//!SECTION - Type of Context
type authContextType = {
  userSession: userType | null;
  setUserSession: (user: userType | null) => void;
  //NOTE this is userLogin function types
  errorHandle: string;
  userLogin: (userEmail: string,userPassword: string) => Promise<void>;
  //NOTE this is userRegister function types
  userRegister: (displayName:string, email:string, password:string, file:string) => Promise<void>;


//REVIEW - for test 
// getUser:User;

//
logOut: () => void

};

//!SECTION - Init Value to The Context
const initAuthContext = {
    userSession: {} as userType,
  setUserSession: () => {
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
  const [userSession, setUserSession] = useState<userType | null>(null);
//









//FIXME - Error Handling should fixe
const logOut = () => {
  signOut(auth)
    .then(() => {
      setUserSession(null);
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
      const getUser = userCredential.user;

// 

const id = getUser.uid;
const name = getUser.displayName;
const email =  getUser.email

// if (userSession) {
    setUserSession({
        id: id,
        name: name, 
        email: email
        
    });
// }
// else{
    console.log("================= > user ", userSession)

// }



// console.log("==========getUser============", getUser.displayName, getUser.uid, getUser.email)


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




  return (


    //!SECTION - Component Provider
    <AuthContext.Provider value={{ userSession, setUserSession, userLogin, errorHandle, userRegister, logOut }}>
      {children}
    </AuthContext.Provider>



  );
};
