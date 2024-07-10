// src/App.js
import React from 'react';
import Activities from './components/Activities';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>OrbiApp Activities</h1>
        <Activities />
      </header>
    </div>
  );
}

export default App;