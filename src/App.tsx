import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="wrap">
      <header>
        <h1>5 Day Weather Forecast</h1>
      </header>
      <Search />
      <footer>
        <p>Web Frontend</p>
      </footer>
    </div>
  );
}

export default App;
