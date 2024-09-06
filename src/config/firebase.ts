// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "android-stories-732bc.firebaseapp.com",
  projectId: "android-stories-732bc",
  storageBucket: "android-stories-732bc.appspot.com",
  messagingSenderId: "1064744064291",
  appId: "1:1064744064291:web:d4fd434a1f61fbd42e6896",
  measurementId: "G-0R5S3S32FK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storageDB = getStorage(app);
