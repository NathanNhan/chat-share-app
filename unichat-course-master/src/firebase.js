import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBF2Frn_g11Z5pHqVgOdA5S2irPUeUayoM",
  authDomain: "chat-app-56847.firebaseapp.com",
  projectId: "chat-app-56847",
  storageBucket: "chat-app-56847.appspot.com",
  messagingSenderId: "183351572637",
  appId: "1:183351572637:web:b5b628c101dc1ba515fc74",
  measurementId: "G-X2HDJME19P",
}).auth();
