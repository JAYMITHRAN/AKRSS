// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACZvrqeudHBL6gro8qCDd3HezfIAOJYQs",
  authDomain: "akrss-f05db.firebaseapp.com",
  projectId: "akrss-f05db",
  storageBucket: "akrss-f05db.firebasestorage.app",
  messagingSenderId: "351232642060",
  appId: "1:351232642060:web:c8c28f5e080ea59cacb229",
  measurementId: "G-716XQ7QF3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);