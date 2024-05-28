import { FirebaseError } from "firebase/app";

export const catchError = (error: FirebaseError) => {
    switch (error?.code) {
      case 'auth/invalid-credential':
        alert('Either email or password is incorrect. Please try again.');
        break;
      case 'auth/email-already-in-use':
        alert('The entered email already exists.');
        break;
      case 'auth/weak-password':
        alert('Password should be at least 6 characters.');
        break;
      case 'auth/invalid-email':
        alert('Please use a valid email.');
        break;
      default:
        alert('Some error occurred. Please try again.');
        break;
    }
  };
  