// React
import React, {useState} from 'react'

// Utilisez Link pour un lien sans refreshir
// Utilisez le hooks useNavigate pour rediriger l'utilisateur
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  // state pour la connexion
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')


  // methode pour l'event email et password
  const handleEmail = (event) => {
    // event.target fait référence à l'élément (champ de formulaire) qui a provoqué l'événement
    setemail(event.target.value);

  };
  // methode pour l'event password
  const handlePassword = (event) => {
    // event.target fait référence à l'élément (champ de formulaire) qui a provoqué l'événement
    setemail(event.target.value);
  }

  
  return (
    <div className='signUpLoginBox'>
        <div className='slContainere'>
        <div className='formBoxLeftLogin'>

        </div>
        </div>
        <div className='formBoxRight'>
              <div className='formContent'>
                <h2>Connexion</h2>
                  <form>                                   

                      <div className='inputBox'>
                        <input onChange={handleEmail} value={email} type='email' autoComplete='off' required/>
                        <label htmlFor='email'>Email</label>                      
                      </div>

                      <div className='inputBox'>
                        <input onChange={handlePassword} value={password} type='password' autoComplete='off' required/>
                        <label htmlFor='password'>Mot de passe</label>                      
                      </div>
                      
                  </form>
                  <div className='linkContainer'>
                    <Link className='simpleLink' to='/signup'>Nouveau sur Marvel-Quiz? Inscrivez-vous maintenant.</Link>
                  </div>
          </div>
        </div>
    </div>
  )
}

export default Login