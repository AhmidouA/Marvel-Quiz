import React from 'react';
import '../../App.css';

// Component
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';


function App() {
  return (
    <div>
      <Header />

      <Welcome />
      <Landing />
      <Login />
      
      <Footer />
    </div>
  );
}

export default App;
