// bdd firebase init
// npm firebase
import { initializeApp } from "firebase/app";
// Api Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

// gestion des tables (collection)
import { getFirestore, doc } from 'firebase/firestore'


// Your web app's Firebase configuration (google firebase params)
// varibale d'env
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
// Api
class Firebase {
    constructor() {
        // Initialise l'application Firebase avec la configuration
        initializeApp(firebaseConfig)

        // Obtient l'objet d'authentification Firebase
        /* La fonction getAuth() est utilisée pour obtenir une instance de l'objet d'authentification Firebase. 
        Cet objet d'authentification est une interface qui fournit des méthodes pour gérer 
        l'authentification des utilisateurs dans votre application */
        this.auth = getAuth();

        // gestion de la base avec Firebase/firestore
        this.db = getFirestore()
              
    }
  
    // SignUp
    signUpUser = (email, password) => {
        // Crée un nouvel utilisateur avec l'adresse e-mail et le mot de passe fournis
        return createUserWithEmailAndPassword(this.auth, email, password)
    };

    // Login
    loginUser = (email, password) => {
        // Connecte un utilisateur avec l'adresse e-mail et le mot de passe fournis
        return signInWithEmailAndPassword(this.auth, email, password)
    };

    // SignOut
    signOutUser = () => {
        // Déconnecte l'utilisateur actuellement connecté
        return signOut(this.auth)
    };

    // recupérer le mot de passe
    passwordReset = (email) => { 
        // envoi un mail a utilisateur avec l'adresse e-mail fournis
        return sendPasswordResetEmail(this.auth, email)
    };
    
    // gestion de la base de donnée des user
    // le params est l'userId = uid
    user = (uid) => { 
        // console.log("Le userId Firebase>>>>>", uid)
        //  Vous devez utiliser doc() de Firebase Firestore pour obtenir une référence à un document spécifique dans une collection
        return doc(this.db, `users/${uid}`)
        
    }
}

export default Firebase;
