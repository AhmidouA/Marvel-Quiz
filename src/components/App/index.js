// React
import React from 'react';

// React Route (BrowserRouter, Route, Routes) 
// Redirect avec Navigate
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Css
import '../../App.css';

// Component
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';
import ErrorPage from '../ErrorPage';
import ForgotPassword from '../ForgotPassword';

function App() {
  return (

      <Router>
        <Header />
        {/* <Routes> a remplacé <Switch> */}
        <Routes >
            {/* Les routes pour pouvoir les utiliser */}
            <Route path='/' element={<Landing />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />

            {/* Error Page:  L'etoile * veut dire All page non trouvé */}
            <Route path='*' element={<ErrorPage />} />                        
        </Routes> 
        <Footer />    
      </Router>    

  );
}

export default App;
