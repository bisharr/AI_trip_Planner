// Import the functions you need from the SDKs you need
import App from "@/App";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXY_uTaZ17qag7VzuKn9npnRB3SLfJNxg",
  authDomain: "aitriplanner-e622d.firebaseapp.com",
  projectId: "aitriplanner-e622d",
  storageBucket: "aitriplanner-e622d.firebasestorage.app",
  messagingSenderId: "58533450570",
  appId: "1:58533450570:web:eec67a6bdd58e38f2f27b3",
  measurementId: "G-5VYRL4W4H6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
