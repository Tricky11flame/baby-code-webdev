// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyABRBAHfbKhrWpu1D4xTopmKx3wG-LVvCQ",

  authDomain: "baby-code-webdev.firebaseapp.com",

  projectId: "baby-code-webdev",

  storageBucket: "baby-code-webdev.firebasestorage.app",

  messagingSenderId: "347629687545",

  appId: "1:347629687545:web:70407d796db3c1adc9c828"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore (app);
