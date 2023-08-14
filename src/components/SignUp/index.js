import React, {useState} from 'react'

const SignUp = () => {

  // data du form 
  const data = {
    username:'',
    email: '',
    password: '',
    confirmPassword: ''
  }


  // State
  const [loginData, setloginData] = useState(data)

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
  const FormConfirm = ( username, email, password, confirmPassword) => {
    if (username !== '' && email !== '' && password !== '' && confirmPassword === password) {
      return <button>Inscription</button>;
    }
    return <button disabled>Inscription</button>;
  };



  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftSignup'>

            </div>
            <div className='formBoxRight'>
              <div className='formContent'>
                <h2>Inscription</h2>
                  <form>                 
                      <div className='inputBox'>
                        <input onChange={handleChange} value={username} type='text' id="username" autoComplete='off' required/>
                        <label htmlFor='username'>Nom</label>                      
                      </div>

                      <div className='inputBox'>
                        <input onChange={handleChange} value={email} type='email' id="email" autoComplete='off' required/>
                        <label htmlFor='email'>Email</label>                      
                      </div>

                      <div className='inputBox'>
                        <input onChange={handleChange} value={password} type='text' id="password" autoComplete='off' required/>
                        <label htmlFor='password'>Mot de passe</label>                      
                      </div>

                      <div className='inputBox'>
                        <input onChange={handleChange} value={confirmPassword} type='password' id="confirmPassword" autoComplete='off' required/>
                        <label htmlFor='confirmPassword'>Confimer le mot de pass</label>                      
                      </div>

                      {/* Confirm form methode */}
                      {FormConfirm()}
                  </form>
              </div>
            </div>
        </div>       
    </div>
  )
}

export default SignUp