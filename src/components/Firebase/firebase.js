// bdd firebase init
// npm firebase
import { initializeApp } from "firebase/app";

// Api Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { getFirestore, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// Api
class Firebase {
  constructor() {
    initializeApp(firebaseConfig);

    this.auth = getAuth();

    this.db = getFirestore();
  }

  // SignUp
  signUpUser = (email, password) => {

    return createUserWithEmailAndPassword(this.auth, email, password);
  };

  // Login
  loginUser = (email, password) => {

    return signInWithEmailAndPassword(this.auth, email, password);
  };

  // SignOut
  signOutUser = () => {

    return signOut(this.auth);
  };

  // Rest Password
  passwordReset = (email) => {

    return sendPasswordResetEmail(this.auth, email);
  };


  user = (uid) => {
    // console.log("Le userId Firebase>>>>>", uid)
    return doc(this.db, `users/${uid}`);
  };
}

export default Firebase;
