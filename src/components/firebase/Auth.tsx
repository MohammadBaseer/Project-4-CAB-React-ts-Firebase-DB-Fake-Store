// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_6SJ_ulnnqS8pYftXsUOjcZjzZ7MRfKc",
  authDomain: "user-story-9229e.firebaseapp.com",
  projectId: "user-story-9229e",
  storageBucket: "user-story-9229e.appspot.com",
  messagingSenderId: "286207809283",
  appId: "1:286207809283:web:019fcc9e084ccac4ba3b36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app)

const storage = getStorage();

export { app, auth, db, storage};