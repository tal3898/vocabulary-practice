import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import "./App.css";
import Card from "./card/card";
import { OriginalLanguage } from "./models/originalLanguage";
import { Word } from "./models/word";
import translate from "translate";
import { OptionsModal } from "./optionsModal/optionsModal";

const stub = [
  {
    english: "hello",
    spanish: "hola",
  },
  {
    english: "have",
    spanish: "tener",
  },
  {
    english: "how",
    spanish: "como",
  },
];

function App() {
  const [open, setOpen] = React.useState(false);
  const [wordsList, setWordsList] = useState<Word[]>(stub);
  const [fromLanguage, setFromLanguage] = useState(OriginalLanguage.ENGLISH);

  translate.engine = "google";

  const changeOriginalLanguage = () => {
    if (fromLanguage === OriginalLanguage.ENGLISH) {
      setFromLanguage(OriginalLanguage.SPANISH);
    } else if (fromLanguage === OriginalLanguage.SPANISH) {
      setFromLanguage(OriginalLanguage.RANDOM);
    } else if (fromLanguage === OriginalLanguage.RANDOM) {
      setFromLanguage(OriginalLanguage.ENGLISH);
    }
  };

  return (
    <div className="App" style={{ padding: 1 }}>
      {/* <p>hjel</p> */}
      <div className="header">
        <div onClick={() => setOpen(true)} className="listButton">
          <IoMdSettings color="rgb(106 106 106)" size={40} />
        </div>
        <div
          onClick={() => changeOriginalLanguage()}
          className="originalLangBtn"
        >
          {fromLanguage}
        </div>
      </div>
      <div className="content" style={{ display: "flex", height: "100%" }}>
        <Card fromLanguage={fromLanguage} wordsList={wordsList} />
      </div>

      <OptionsModal
        onChangeWordsList={setWordsList}
        open={open}
        setIsOpen={setOpen}
      />
    </div>
  );
}

export default App;
