import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calculator />} />
      </Routes>
    </Router>
  );
}

export default App;
