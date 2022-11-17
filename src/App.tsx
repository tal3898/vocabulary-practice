import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './card/card';
import {AiOutlineUnorderedList} from 'react-icons/ai';
import {CiPlay1} from 'react-icons/ci';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className="App" style={{ padding: 1}}>
        {/* <p>hjel</p> */}
        <div  className='header'>
          <div onClick={handleOpen} className="listButton">
            <AiOutlineUnorderedList color='rgb(106 106 106)' size={40} />
          </div>
        </div>
        <div className='content' style={{display: 'flex', height: '100%'}}>
          <Card wordsList={stub} />
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{marginBottom: 10}}>List the words to practice</div>
            <div style={{ width: '100%', height: '10rem', paddingRight: 10}} >
            <textarea name="Text1" style={{resize: 'none', width: '100%', height: '100%'}}/>
            </div>
            <div className='applyListButton'><CiPlay1 size={30}/></div>
          </Box>
        </Modal>
    </div>
  );
}

export default App;
