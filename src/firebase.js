// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9G9Vc7spwZVekWqZGAs6v82rFwqFP498",
  authDomain: "project-1-d6c4a.firebaseapp.com",
  projectId: "project-1-d6c4a",
  storageBucket: "project-1-d6c4a.firebasestorage.app",
  messagingSenderId: "628070285676",
  appId: "1:628070285676:web:8f1a0c4596944e8e58f349",
  measurementId: "G-8JXWT34F9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the instances for use in the application
export { app, analytics };
