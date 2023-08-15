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
        // Initialise l'application Firebase avec la configuration
        initializeApp(firebaseConfig)

        // Obtient l'objet d'authentification Firebase
        /* La fonction getAuth() est utilisée pour obtenir une instance de l'objet d'authentification Firebase. 
        Cet objet d'authentification est une interface qui fournit des méthodes pour gérer 
        l'authentification des utilisateurs dans votre application */
        this.auth = getAuth();
              
    }
  
    // SignUp
    signUpUser = (email, password) => 
    // Crée un nouvel utilisateur avec l'adresse e-mail et le mot de passe fournis
    createUserWithEmailAndPassword(this.auth, email, password)

    // Login
    loginUser = (email, password) => 
    // Connecte un utilisateur avec l'adresse e-mail et le mot de passe fournis
    signInWithEmailAndPassword(this.auth, email, password)

    // SignOut
    signOutUser = () => 
    // Déconnecte l'utilisateur actuellement connecté
    signOut(this.auth)
    
    
}

export default Firebase;
