import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  //ใส่คีย์ Firebase ตรงนี้
  apiKey: "...",
  authDomain: "[YOUR_PROJECT].firebaseapp.com",
  databaseURL: "https://[YOUR_PROJECT].firebaseio.com",
  projectId: "[YOUR_PROJECT]",
  storageBucket: "[YOUR_PROJECT].appspot.com",
  messagingSenderId: "...",
  appId: "1:...:web:...",
  measurementId: "G-...",
};
const app = firebase.initializeApp(firebaseConfig);
export const database = getDatabase(app);
