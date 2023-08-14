import React from 'react'

const SignUp = () => {
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
                        <input type='text' id="username" autoComplete='off' required/>
                        <label htmlFor='username'>Nom</label>                      
                      </div>

                      <div className='inputBox'>
                        <input type='email' id="email" autoComplete='off' required/>
                        <label htmlFor='email'>Email</label>                      
                      </div>

                      <div className='inputBox'>
                        <input type='text' id="password" autoComplete='off' required/>
                        <label htmlFor='password'>Mot de passe</label>                      
                      </div>

                      <div className='inputBox'>
                        <input type='password' id="confirmPassword" autoComplete='off' required/>
                        <label htmlFor='confirmPassword'>Confimer le mot de pass</label>                      
                      </div>
                  </form>
              </div>
            </div>
        </div>       
    </div>
  )
}

export default SignUp