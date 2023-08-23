import React, { useState, Fragment, useContext, useEffect } from 'react'

// Utilisez le hooks useNavigate pour rediriger l'utilisateur
import { useNavigate } from 'react-router-dom';



// components
import Logout from '../Logout';
import Quiz from '../Quiz';

//bdd
import { FirebaseContext } from '../Firebase';


const Welcome = () => {

  // redirection
  const redirectPage = useNavigate()

  // useContext pour récuper le provider (les data et methode) de Firebase
  const firebase = useContext(FirebaseContext)

  // state Session
  const [userSession, setUserSession] = useState(null);

  // methode pour la session
  useEffect(() => {
    // Obtenir l'utilisateur actuellement connecté
    // La méthode recommandée pour obtenir l'utilisateur actuel consiste à définir un observateur sur l'objet Auth
    let listner = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        return setUserSession(user)
      }
      redirectPage('/')
    })
  
    // on demonte le composant (demontage = clean)
    return () => {
      listner()
    }
  }, [])
  

  

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
            <Quiz /> 
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