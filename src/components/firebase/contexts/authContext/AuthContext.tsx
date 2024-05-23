// import { User, onAuthStateChanged } from "firebase/auth";
// import { ReactNode, createContext, useEffect, useState } from "react"
// import { auth } from "../../Auth";

// type FirebaseAuthContextType ={
//     currentUser:  User | null ,
//     setCurrentUser: (e: User | null) => void
// }

// const createContextInitValue:FirebaseAuthContextType = {
//     currentUser: null ,
//     setCurrentUser: () => {throw new Error("Error has been occur");}
    
// }

// type AuthContextProviderFirebaseProps ={
//     children: ReactNode
// }

// export const FirebaseAuthContext = createContext<FirebaseAuthContextType>(createContextInitValue);

// export const AuthContextProviderFirebase = ({children}:AuthContextProviderFirebaseProps) =>{
// const [currentUser, setCurrentUser]= useState<User | null>(null);

// useEffect(() => {
// onAuthStateChanged(auth,(user)=>{
//     setCurrentUser(user)
// })
// }, [])

// console.log("===User===> ",currentUser);

// return  (
// <FirebaseAuthContext.Provider value={{currentUser, setCurrentUser}}>
//     {children}
// </FirebaseAuthContext.Provider>
// )


// }