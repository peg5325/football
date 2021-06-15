import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwsrE3qZ9uC1hnrBEtZhqx0T-jeLvr58w",
  authDomain: "football-af800.firebaseapp.com",
  projectId: "football-af800",
  storageBucket: "football-af800.appspot.com",
  messagingSenderId: "865274080711",
  appId: "1:865274080711:web:fa618d34052395ce147de2",
  measurementId: "G-GG320M4ECX",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
