import React, { useState, Fragment, useContext, useEffect } from 'react'

// Utilisez le hooks useNavigate pour rediriger l'utilisateur
import { useNavigate } from 'react-router-dom';





// components
import Logout from '../Logout';
import Quiz from '../Quiz';

//bdd
import { FirebaseContext } from '../Firebase';

// getDoc() est une fonction fournie par Firebase Firestore qui vous permet de récupérer 
// les données d'un document spécifique dans une collection
import { getDoc } from 'firebase/firestore';


const Welcome = () => {

  // redirection
  const redirectPage = useNavigate()

  // useContext pour récuper le provider (les data et methode) de Firebase
  const firebase = useContext(FirebaseContext)

  // state Session
  const [userSession, setUserSession] = useState(null);

  // state data user
  const [userData, setUserData] = useState({})




  // methode pour la session
  useEffect(() => {
    // Obtenir l'utilisateur actuellement connecté
    // La méthode recommandée pour obtenir l'utilisateur actuel consiste à définir un observateur sur l'objet Auth
    let listner = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        // on défini l'user dans la session 
        setUserSession(user);


        // recupéreration de la data de fireBase (firestore)
        // Utilisation de la méthode user(user.uid) pour récupérer un document spécifique dans Firestore
        // console.log("user ID>>>>>", user.uid);

        // Obtenez la référence au document
        const userDocRef = firebase.user(user.uid); 
         // Utilisez getDoc() pour obtenir les données du document
        return getDoc(userDocRef) 
        .then((doc) => {
          // Vérification si le document existe (doc.exists renvoie un booléen)
          if (doc.exists) {
            // Récupération des données du document
            const myData = doc.data();
            // Mise à jour de l'état avec les données récupérées
            setUserData(myData)
            }
          })
          .catch ((error) => {
            console.log("error", error)
          });
      }
      return redirectPage('/')
    });

  
    // on demonte le composant (demontage = clean)
    return () => {
      listner()
    }
    
  }, [userSession])
  

  

  // methode pour savoir la session (connexion)
  const displayUser = () => {
    if (userSession === null) {
      return <Fragment>
        <div className='loader'></div>
        <p>Loading...</p>
      </Fragment>   
    }
      return <div className='quiz-bg'>
        <div className='container'>
            <Logout />

            {/* J'envoi la data de user en props. je récupere le username dans quizz */}
            <Quiz userData={userData} /> 
        </div>
    </div>
  }

  return (
    <Fragment>
      {displayUser()} {/* Appel de la fonction displayUser */}
    </Fragment>
  )
};

export default Welcome;