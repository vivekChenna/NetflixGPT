// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd8sMPRFzM9cMiyeAOYAgvdH4CjgD5pQI",
  authDomain: "netflix-gpt-react-project.firebaseapp.com",
  projectId: "netflix-gpt-react-project",
  storageBucket: "netflix-gpt-react-project.appspot.com",
  messagingSenderId: "513595683499",
  appId: "1:513595683499:web:2aa1260b618dc3cb3a3dee",
  measurementId: "G-3ZVVGD07DS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
