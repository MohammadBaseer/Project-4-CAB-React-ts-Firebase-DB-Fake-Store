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
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Reference to the storage location
    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error during file upload:", error);
      },
      async () => {
        try {
          // Get download URL once upload completes
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Update user profile with display name and photo URL
          await updateProfile(user, {
            displayName,
            photoURL: downloadURL,
          });

          // Save user data to Firestore
          await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          // Initialize user chats document
          await setDoc(doc(db, "userChats", user.uid), {});

          console.log("User registration successful");
        } catch (error) {
          console.error("Error updating profile or Firestore:", error);
        }
      }
    );
  } catch (error: any) {
    console.error("Error during user registration:", error.code, error.message);
  }
};

export { userRegistration };
