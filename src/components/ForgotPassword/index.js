import React, { useState, useContext } from "react";

// Utilisez Link pour un lien sans refreshir
// Utilisez le hooks useNavigate pour rediriger l'utilisateur
import { Link, useNavigate } from 'react-router-dom';

//bdd
import { FirebaseContext } from "../Firebase";


const ForgotPassword = () => {

    // redirection
    const redirectPage = useNavigate()

    // useContext pour récuper le provider (les data et methode) de Firebase
    const firebase = useContext(FirebaseContext)

    // state email
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('') // message de message envoyé
    const [error, setError] = useState('') // message d'erreur

    // methode validation du form 
    const handleOnSubmit = (event) => {

        event.preventDefault();

        // Envoyer un e-mail de réinitialisation du mot de passe
        firebase.passwordReset(email)
        .then (() => {

            
            setSuccess(`Consulter votre boite email ${email} pour changer le mot de passe `)

            // on lui vide les variable aprés l'envoi de mail
            setEmail('')
            // on lui vide la variable afin qu'il revoi pas le message d'erreur aprés une 1er erreur
            setError('')

            // redirection aprés 5 second vers la page de login aprés validation
            setTimeout(() => {
                redirectPage('/login')
            }, 5000);
        })

        .catch((error) => {
            // afficher le message d'erreur
            setError(error)
            // on lui vide les variable afin qu'il re essaye
            setEmail('')
        })

    };

    // methode pour l'event email et password
    const handleEmail = (event) => {
        setEmail(event.target.value)
    };

    // le button display si y'a un mail (chaine de carractére )
    const disabledBtn = () => {
       if (email === '') {
        return 'disabled'
       }
    }


    // message de success
    const successMessage = () => {
        if (success) {
            return <span style={{border: '1px solid green', background: 'green', color:'#ffffff'}}>{success}</span>
        }
        return null
    };

    // Message d'erreur 
    const errorMessage = () => {
        if (error) {
            return <span>Email incorrect</span>
        }
        return null
    };



    return (
        <div className='signUpLoginBox'>
        <div className='slContainere'>
        <div className='formBoxLeftForget'>

        </div>
        </div>
        <div className='formBoxRight'>
              <div className='formContent'>

                {/* condition pour message success */}
                {successMessage()}

                {/* condition pour message error */}
                {errorMessage()}


                <h2>Mot de passe oublié ?</h2>
                  <form onSubmit={handleOnSubmit}>                                   

                      <div className='inputBox'>
                        <input onChange={handleEmail} value={email} type='email' autoComplete='off' required/>
                        <label htmlFor='email'>Email</label>                      
                      </div>

                      {/* condition pour le btn */}
                      <button disabled={disabledBtn()}>Recupérer</button>
                      {}
                      
                  </form>
                  <div className='linkContainer'>
                  <Link className='simpleLink' to='/login'>Déjé Inscrit ? Connextez-vous.</Link>
                  </div>
          </div>
        </div>
    </div>
    )
};

export default ForgotPassword