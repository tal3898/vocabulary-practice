import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './card/card';
import {AiOutlineUnorderedList} from 'react-icons/ai';
import {CiPlay1} from 'react-icons/ci';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Word } from './models/word';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const stub = [{
  english: 'hello', 
  spanish: 'hola'
},{
  english: 'have', 
  spanish: 'tener'
},{
  english: 'how', 
  spanish: 'como'
},]

function App() {
  const [open, setOpen] = React.useState(false);
  const [wordsInputText, setWordsInputText] = useState('');
  const [wordsList, setWordsList] = useState<Word[]>(stub);

  const changeWordsList = () => {
    console.log({wordsInputText})
    const allWords = wordsInputText.split('\n');
    const finalWordsList: Word[] = [];
    for (const word of allWords) {
      const wordParts = word.split(' - ');
      const spanishTranslation = wordParts[0];
      const englishTranslation = wordParts[1];
      finalWordsList.push({
        english: englishTranslation,
        spanish: spanishTranslation,
      })
    }

    setWordsList(finalWordsList);
    setOpen(false);
  }

  return (
    <div className="App" style={{ padding: 1}}>
        {/* <p>hjel</p> */}
        <div  className='header'>
          <div onClick={() => setOpen(true)} className="listButton">
            <AiOutlineUnorderedList color='rgb(106 106 106)' size={40} />
          </div>
        </div>
        <div className='content' style={{display: 'flex', height: '100%'}}>
          <Card wordsList={wordsList} />
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{marginBottom: 10}}>List the words to practice</div>
            <div style={{ width: '100%', height: '10rem', paddingRight: 10}} >
            <textarea value={wordsInputText} onChange={(e) => setWordsInputText(e.target.value)} name="Text1" style={{resize: 'none', width: '100%', height: '100%'}}/>
            </div>
            <div className='applyListButton'><CiPlay1 onClick={changeWordsList} size={30}/></div>
          </Box>
        </Modal>
    </div>
  );
}

export default App;
