import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './card/card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>hjel</p>
        <Card word={{english: 'asd', spanish: 'ssqwe'}} />
      </header>
    </div>
  );
}

export default App;
