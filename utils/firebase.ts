// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgE8q86DIegYNMjJviR6GTpU-fMyPwQmg",
  authDomain: "blog-505f2.firebaseapp.com",
  databaseURL: "https://blog-505f2-default-rtdb.firebaseio.com",
  projectId: "blog-505f2",
  storageBucket: "blog-505f2.appspot.com",
  messagingSenderId: "353281890487",
  appId: "1:353281890487:web:0ab7f3289fe5677c4c9532",
  measurementId: "G-J8YKC7ERK4"
};



// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth()
const storage = getStorage(app)
const db = getFirestore(app)

export default { app, auth, db, storage }


