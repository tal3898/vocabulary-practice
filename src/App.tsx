import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './card/card';
import {AiOutlineUnorderedList} from 'react-icons/ai';

function App() {
  return (
    <div className="App" style={{ padding: 1}}>
        {/* <p>hjel</p> */}
        <div  className='header'>
          <div style={{backgroundColor: 'white', width: 'fit-content', height: 'fit-content', borderRadius: 10, margin: 20}}>
            <AiOutlineUnorderedList color='rgb(106 106 106)' size={40} />
          </div>
        </div>
        <div className='content' style={{display: 'flex', height: '100%'}}>
          <Card word={{english: 'asd', spanish: 'ssqwe'}} />
        </div>
    </div>
  );
}

export default App;
