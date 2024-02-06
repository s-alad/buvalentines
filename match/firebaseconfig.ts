// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_GReUVRLoB2h1lzqIuTyemQ58uYalFvY",
    authDomain: "buvalentines.firebaseapp.com",
    projectId: "buvalentines",
    storageBucket: "buvalentines.appspot.com",
    messagingSenderId: "404606360407",
    appId: "1:404606360407:web:24009205179fca4608fc12",
    measurementId: "G-08YZ364V4W"  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { auth };
export { db };