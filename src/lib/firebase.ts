import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeYW4FzPkzScz4vT0EQjMluGioZpckO20",
  authDomain: "shadesbymahie.firebaseapp.com",
  projectId: "shadesbymahie",
  storageBucket: "shadesbymahie.firebasestorage.app",
  messagingSenderId: "598060293361",
  appId: "1:598060293361:web:fa9639da509b45e700dd50",
  measurementId: "G-E01HF2EX2Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;
