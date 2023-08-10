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

function App() {
  return (
    <div>
      <Header />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
