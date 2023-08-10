import React from 'react';
import '../../App.css';

// Component
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';


function App() {
  return (
    <div>
      <Header />
      <Welcome />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
