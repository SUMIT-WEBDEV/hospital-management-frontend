// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYVU7gzaTcvZSQH2J5ijxS25saALWxXjI",
  authDomain: "zafar-de2ef.firebaseapp.com",
  projectId: "zafar-de2ef",
  storageBucket: "zafar-de2ef.appspot.com",
  messagingSenderId: "90937572196",
  appId: "1:90937572196:web:071119d37a6c85fd76d871",
  measurementId: "G-QTVF51F500"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase
export const auth = getAuth(app);
export const db = getFirestore(app)