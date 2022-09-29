// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpmOufQ2VRFCMW0VfECTQG5ACapqDxJN4",
  authDomain: "todo-week7.firebaseapp.com",
  projectId: "todo-week7",
  storageBucket: "todo-week7.appspot.com",
  messagingSenderId: "315290371706",
  appId: "1:315290371706:web:89d168431e684328c35dc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };