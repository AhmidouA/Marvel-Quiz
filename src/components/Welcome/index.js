import React, { useState, Fragment, useContext, useEffect } from 'react'


import { useNavigate } from 'react-router-dom';


// components
import Logout from '../Logout';
import Quiz from '../Quiz';
import Loader from '../Loader';

//bdd
import { FirebaseContext } from '../Firebase';

import { getDoc } from 'firebase/firestore';


const Welcome = () => {

  const redirectPage = useNavigate()

  const firebase = useContext(FirebaseContext)

  const [userSession, setUserSession] = useState(null);

  const [userData, setUserData] = useState({})





  useEffect(() => {
    let listner = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setUserSession(user);
        const userDocRef = firebase.user(user.uid); 
        return getDoc(userDocRef) 
        .then((doc) => {
          if (doc.exists) {
    
            const myData = doc.data();
            setUserData(myData)
            }
          })
          .catch ((error) => {
            console.log("error", error)
          });
      }
      return redirectPage('/')
    });

    return () => {
      listner()
    }
    
  }, [userSession])
  

  


  const displayUser = () => {
    if (userSession === null) {
      return <Loader loadingMsg={'Authentification'} styling={{ textAlign: "center", color: "#FFFFFF" }}/> 
    }
      return <div className='quiz-bg'>
        <div className='container'>
            <Logout />
            <Quiz userData={userData} /> 
        </div>
    </div>
  }

  return (
    <Fragment>
      {displayUser()} 
    </Fragment>
  )
};

export default Welcome;