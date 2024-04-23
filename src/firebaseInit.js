// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyDhr7YBbmW9jTWbHwfEqyABiB_i96xvdQo",
    authDomain: "buybusy-ff512.firebaseapp.com",
    projectId: "buybusy-ff512",
    storageBucket: "buybusy-ff512.appspot.com",
    messagingSenderId: "652525662052",
    appId: "1:652525662052:web:4ca9f45ea389c4c7de5471"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export default db;
export { app, auth };