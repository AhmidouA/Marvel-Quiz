import React from 'react';
import '../../App.css';

// Component
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';

function App() {
  return (
    <div>
      <Header />

      <Welcome />
      <Landing />
      <SignUp />
      <Login />
           
      <Footer />
    </div>
  );
}

export default App;
