import React, {useState, useContext} from 'react'

// le composant Link permet à votre application de gérer la navigation sans recharger complètement 
// la page, ce qui améliore les performances et l'expérience utilisateur.
// Utilisez le hooks useNavigate pour rediriger l'utilisateur
import { Link, useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';

const SignUp = () => {

  // redirection 
  // Le useNavigatecrochet renvoie une fonction qui permet de naviguer par programmation, 
  //par exemple dans un effet :
  const redirectPage = useNavigate()


  // useContext pour récuper le provider (les data et methode) de Firebase
  const firebase = useContext(FirebaseContext)
  // console.log("firebase>>>>>>", firebase)

  // data du form 
  const data = {
    username:'',
    email: '',
    password: '',
    confirmPassword: ''
  };


  // State
  const [loginData, setloginData] = useState(data)
  const [error, setError] = useState('')

  // Destructuring pour les values du form 
  const {username, email, password, confirmPassword} = loginData

  /* methode plus complexe
  // methode pour récuperer la data
  const handleChange = (event) => {
    // avec le spread operator pour récupérer tout l'objet
    setloginData({...loginData, 
      // on prend l'id de l'event (data) qu'on souhaite changer et on la change avec la valeur entré
      [event.target.id]: event.target.value })

  }
  */

  /*  Ma methode pour récuperer la data */
  const handleChange = (event) => {
    // event.target fait référence à l'élément (champ de formulaire) qui a provoqué l'événement
    const { id, value } = event.target;
    switch (id) {
      case "username":
        setloginData({ ...loginData, username: value });
        break;
      case "email":
        setloginData({ ...loginData, email: value });
        break;
      case "password":
        setloginData({ ...loginData, password: value });
        break;
      case "confirmPassword":
        setloginData({ ...loginData, confirmPassword: value });
        break;
      default:
        break;
    }
  };


  // methode confirmation
  const FormConfirm = () => {
    if (username !== '' && email !== '' && password !== '' && confirmPassword !== '' && confirmPassword === password) {
      return <button>Inscription</button>;
    }
    return <button disabled>Inscription</button>;
  };

  // methode validation et l'envoi du formulaire dans la bdd
  const handleSubmit = (event) => {
    // on évite de faire refresh la page au moment ou on valide
    event.preventDefault();

    // Réinitialiser l'erreur à une valeur vide
    setError(''); // Réinitialiser l'erreur à une valeur vide

     // on appelle la méthode signUpUser dans firebase et on lui passe les params (= les variables = state)
    firebase.signUpUser(email, password)
    .then(user => {
      // on vide le form aprés validation
      setloginData({...data});

      // Réinitialiser l'erreur à une valeur vide
      setError('');

      // une fois le form validé on le redirege vers la page accueil grace au hooks useNavigate
      redirectPage('/welcome')

    })
    .catch(error => {
      setError(error);
      // on vide le form meme quand y'a une erreur aprés validation
      setloginData({...data});
    });
  }

  // Gestion d'error
  const errorMessage = () => {
    if (!error) {
      return null
    }
    return <span>{error.message}</span>
  }

  


  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftSignup'>

            </div>
            <div className='formBoxRight'>
              <div className='formContent'>

                {errorMessage()}
                <h2>Inscription</h2>
                  <form onSubmit={handleSubmit}>                 
                      <div className='inputBox'>
                        <input onChange={handleChange} value={username} type='text' id="username" autoComplete='off' required/>
                        <label htmlFor='username'>Nom</label>                      
                      </div>

                      <div className='inputBox'>
                        <input onChange={handleChange} value={email} type='email' id="email" autoComplete='off' required/>
                        <label htmlFor='email'>Email</label>                      
                      </div>

                      <div className='inputBox'>
                        <input onChange={handleChange} value={password} type='password' id="password" autoComplete='off' required/>
                        <label htmlFor='password'>Mot de passe</label>                      
                      </div>

                      <div className='inputBox'>
                        <input onChange={handleChange} value={confirmPassword} type='password' id="confirmPassword" autoComplete='off' required/>
                        <label htmlFor='confirmPassword'>Confimer le mot de pass</label>                      
                      </div>

                      {/* Confirm form methode */}
                      {FormConfirm()}
                  </form>
                  <div className='linkContainer'>
                    <Link className='simpleLink' to='/login'>Déjé Inscrit ? Connextez-vous.</Link>
                  </div>
              </div>
            </div>
        </div>       
    </div>
  )
}

export default SignUp