import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/" element={
            <div className="App">
              <header className="App-header">
                <p>Добро пожаловать! Перейдите на <a href="/calculator">калькулятор</a>.</p>
              </header>
            </div>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
