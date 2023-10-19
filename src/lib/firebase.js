// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOXhSdHM7Jnsww4Z-5ZKIg-pKqsArgLTA",
  authDomain: "saltt-disastertech.firebaseapp.com",
  projectId: "saltt-disastertech",
  storageBucket: "saltt-disastertech.appspot.com",
  messagingSenderId: "645943502177",
  appId: "1:645943502177:web:630270e1288c51a3ac1120",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
