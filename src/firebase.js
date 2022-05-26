// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEzNSDLQTctC1ITKpeVSEpi0vAyLA5YcI",
  authDomain: "react-prac-840e0.firebaseapp.com",
  projectId: "react-prac-840e0",
  storageBucket: "react-prac-840e0.appspot.com",
  messagingSenderId: "654381041820",
  appId: "1:654381041820:web:f7e1e52eb9f6e0461ac559",
  measurementId: "G-5XQ95R644G",
};
initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
