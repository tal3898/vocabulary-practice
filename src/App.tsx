import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './card/card';

function App() {
  return (
    <div className="App">
        {/* <p>hjel</p> */}
        <Card word={{english: 'asd', spanish: 'ssqwe'}} />
    </div>
  );
}

export default App;
