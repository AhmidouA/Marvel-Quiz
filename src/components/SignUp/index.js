import React, {useState, useContext} from 'react'

import { Link, useNavigate } from 'react-router-dom';

// firebase Context 
import { FirebaseContext } from '../Firebase';

import { setDoc } from 'firebase/firestore';


const SignUp = () => {
  const redirectPage = useNavigate()

  const firebase = useContext(FirebaseContext)

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

  const {username, email, password, confirmPassword} = loginData

  const handleChange = (event) => {
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


  const FormConfirm = () => {
    if (username !== '' && email !== '' && password !== '' && confirmPassword !== '' && confirmPassword === password) {
      return <button>Inscription</button>;
    }
    return <button disabled>Inscription</button>;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError(''); 

    firebase.signUpUser(email, password)

    .then ((authUser) => {
      const userID = authUser.user.uid;
      console.log("userID>>>>>", userID)

      const userRef = firebase.user(userID);

      return setDoc(userRef, {
        username: username,
        email: email,
      });

    })
    .then((user) => {
      setloginData({...data});

      setError('');

      redirectPage('/welcome')

    })
    .catch(error => {
      setError(error);
      setloginData({...data});
    });
  }
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
                        <label htmlFor='confirmPassword'>Confimer le mot de passe</label>                      
                      </div>

                      {FormConfirm()}
                  </form>
                  <div className='linkContainer'>
                    <Link className='simpleLink' to='/login'>déjà inscrit ? Connectez-vous.</Link>
                  </div>
              </div>
            </div>
        </div>       
    </div>
  )
}

export default SignUp