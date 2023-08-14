// bdd firebase init
// npm firebase
import { initializeApp } from "firebase/app";
// Api Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


// Your web app's Firebase configuration (google firebase params)
const firebaseConfig = {
    apiKey: "AIzaSyCcg8yHm3GaaAFvKywaDN63Zr1jlWJj5Mg",
    authDomain: "marval-quiz-350e2.firebaseapp.com",
    projectId: "marval-quiz-350e2",
    storageBucket: "marval-quiz-350e2.appspot.com",
    messagingSenderId: "227775404992",
    appId: "1:227775404992:web:12c3ee14d2187387bcc625"
  };

// Api
class Firebase {
    constructor() {
        initializeApp(firebaseConfig)
        this.auth = getAuth()
        
    }

    
    // SignUp
    signUpUser = (email, password) => 
    createUserWithEmailAndPassword(email, password)

    // Login
    loginUser = (email, password) => 
    signInWithEmailAndPassword(email, password)

    // SignOut
    signOutUser = () => 
    signOut()
    
    
}

export default Firebase;
