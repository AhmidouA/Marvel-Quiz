// React
import React, {useState, useEffect, useContext} from 'react'

// Utilisez Link pour un lien sans refreshir
// Utilisez le hooks useNavigate pour rediriger l'utilisateur
import { Link, useNavigate } from 'react-router-dom';

//bdd
import { FirebaseContext } from '../Firebase';



const Login = () => {

  // useContext pour récuper le provider (les data et methode) de Firebase
  const firebase = useContext(FirebaseContext)

  // redirection
  const redirectPage = useNavigate()



  // state pour la connexion
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [btn, setbtn] = useState(false) // pour faire apparaitre le button de confirmation
  const [error, setError] = useState('') // message d'erreur


  // methode pour l'event email et password
  const handleEmail = (event) => {
    // event.target fait référence à l'élément (champ de formulaire) qui a provoqué l'événement
    setEmail(event.target.value);

  };
  // methode pour l'event password
  const handlePassword = (event) => {
    // event.target fait référence à l'élément (champ de formulaire) qui a provoqué l'événement
    setPassword(event.target.value);
  };


  /* L’utilisation de mutations, abonnements, horloges, messages de journalisation, et autres effets de bord 
  n’est pas autorisée au sein du corps principal d’une fonction composant (qu’on appelle la phase de rendu de React). 
  Autrement ça pourrait entraîner des bugs déconcertants et des incohérences dans l’interface utilisateur (UI). 
  */
  useEffect(() => {
    if (password.length > 5 && email !== '') {
      setbtn(true)    

      // On re initalise le btn pour le disabled
    } else if (btn === true) {
      setbtn(false)
    }

    // chaque fois que la valeur de password ou email change, le code à l'intérieur du useEffect sera exécuté. 
    // Plus précisément, il vérifie si la longueur du mot de passe est supérieure à 5 caractères et si 
    // l'email n'est pas vide, puis met à jour l'état du bouton (setbtn(true)) en conséquence.
  }, [password, email, btn]) 

  // Methode pour faire apparaitre le btn selon la condition
  const btnDisplay = () => {
    if (btn === false ) {
      return <button disabled>Connexion</button>
    }
    return <button>Connexion</button>
  }


  // confirmation du form de conenxion
  const handleOnSubmit = (event) => {
    event.preventDefault();

    // console.log("email", email)
    // console.log("password", password)

    firebase.loginUser(email, password)
    .then(user => {
      // on lui vide les variable aprés connexion (facultatif)
      setEmail('')
      setPassword('')
      redirectPage('/welcome')

    })
    .catch (error => {
      // afficher le message d'erreur
      setError(error)
      // on lui vide les variable afin qu'il re essaye de se connecter
      setEmail('')
      setPassword('')

    })
  }

  // Gestion d'error (message)
  const errorMessage = () => {
    if (!error) {
      return null
    }
    return <span>Email ou Mot de passe incorrect</span>
  }
   

  return (
    <div className='signUpLoginBox'>
        <div className='slContainere'>
        <div className='formBoxLeftLogin'>

        </div>
        </div>
        <div className='formBoxRight'>
              <div className='formContent'>

                {errorMessage()}
                <h2>Connexion</h2>
                  <form onSubmit={handleOnSubmit}>                                   

                      <div className='inputBox'>
                        <input onChange={handleEmail} value={email} type='email' autoComplete='off' required/>
                        <label htmlFor='email'>Email</label>                      
                      </div>

                      <div className='inputBox'>
                        <input onChange={handlePassword} value={password} type='password' autoComplete='off' required/>
                        <label htmlFor='password'>Mot de passe</label>                      
                      </div>

                      {/* condition pour le btn */}
                      {btnDisplay()}
                      
                  </form>
                  <div className='linkContainer'>
                    <Link className='simpleLink' to='/signup'>Nouveau sur Marvel-Quiz? Inscrivez-vous maintenant.</Link> 
                    <br />
                    <Link className='simpleLink' to='/forgotpassword'>Mot de passe oublié ?</Link>
                  </div>
          </div>
        </div>
    </div>
  )
}

export default Login