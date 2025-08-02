import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBBuYI7S6o9Bl1F_h1WVsZ4wsys5dOB5i4",
  authDomain: "quiz-app-45741.firebaseapp.com",
  projectId: "quiz-app-45741",
  storageBucket: "quiz-app-45741.firebasestorage.app",
  messagingSenderId: "145138100372",
  appId: "1:145138100372:web:424512da5a1a62acbaac81"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
