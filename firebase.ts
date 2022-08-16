// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwiu-MOYQbpbQ5Ql113ucL04OHkgeTZKk",
  authDomain: "netflix-clone-f6d75.firebaseapp.com",
  projectId: "netflix-clone-f6d75",
  storageBucket: "netflix-clone-f6d75.appspot.com",
  messagingSenderId: "567856103653",
  appId: "1:567856103653:web:0ccfd577de7f49a7c6540c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
