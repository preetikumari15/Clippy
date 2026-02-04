// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "clippy-626b6.firebaseapp.com",
  projectId: "clippy-626b6",
  storageBucket: "clippy-626b6.firebasestorage.app",
  messagingSenderId: "246676868394",
  appId: "1:246676868394:web:ed0b39c4f7dceb256be253",
  measurementId: "G-PZPV70G8KW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);