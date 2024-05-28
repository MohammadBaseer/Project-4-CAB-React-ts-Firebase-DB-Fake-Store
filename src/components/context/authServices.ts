import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase/Auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const userRegistration = async (
  displayName: string,
  email: string,
  password: string,
  file: any
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // console.log("user ========> ", user);

    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(userCredential.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", userCredential.user.uid), {
            id: userCredential.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          //update user's profile with photo url
          updateProfile(auth.currentUser!, {
            displayName: displayName,
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("profile updated!!!!");
              console.log("auth.currentUser>>>>", auth.currentUser);
            })
            .catch((error) => {
              console.log("error updating profile>>", error);
            });

          // End
          await setDoc(doc(db, "userChats", userCredential.user.uid), {});
        });
      },
      (error) => {
        // setErrorHandle(error);
        console.log("error=1", error);
        // setErrorHandle(error.message);
      }
    );
    console.log("User registration success");
    // navigate("/login");
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode", errorCode);
    console.log("errorMessage", errorMessage);
    // setErrorHandle(errorCode);
  }
};

export { userRegistration };
