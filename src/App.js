import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import ActivityPage from './components/ActivityPage';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Activities />} />
        <Route path="/activity/:slug" element={<ActivityPage />} />
      </Routes>
    </Router>
  );
}

export default App;