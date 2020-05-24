import React from 'react';
import './css/App.css';
import AppRouter from './AppRouter'
import AppNavbar from './AppNavbar'

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <div className="container maincontainer" >
        <h1 className="mainheader">Bank Application</h1>
        <AppRouter />
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default App;
