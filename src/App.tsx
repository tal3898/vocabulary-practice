import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import translate from "translate";
import "./App.css";
import Card from "./card/card";
import { LearningOption } from "./models/learningOption";
import { OriginalLanguage } from "./models/originalLanguage";
import { Word } from "./models/word";
import { CatalogModal } from "./catalogModal/catalogModal";
import { Provider } from "react-redux";
import store from "./stateManagement/store";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { SettingsModal } from "./settingsModal/settingsModal";

const stub = [
  {
    english: "hello",
    spanish: "hola",
  },
];

function App() {
  const [open, setOpen] = React.useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const [wordsList, setWordsList] = useState<Word[]>(stub);
  const [fromLanguage, setFromLanguage] = useState(OriginalLanguage.ENGLISH);
  const [selectedLearningOption, setSelectedLearningOption] = useState(
    LearningOption.NEW
  );

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
    <Provider store={store}>
      <div className="App" style={{ padding: 1 }}>
        {/* <p>hjel</p> */}
        <div className="header">
          <div onClick={() => setIsOptionsOpen(true)} className="listButton">
            <IoMdSettings color="rgb(106 106 106)" size={40} />
          </div>
          <div onClick={() => setOpen(true)} className="listButton">
            <BiCategoryAlt color="rgb(106 106 106)" size={40} />
          </div>
          <div
            onClick={() => changeOriginalLanguage()}
            className="originalLangBtn"
          >
            {fromLanguage}
          </div>
        </div>
        <div className="content" style={{ display: "flex", height: "100%" }}>
          <Card
            selectedLearningOption={selectedLearningOption}
            fromLanguage={fromLanguage}
            wordsList={wordsList}
          />
        </div>

        <CatalogModal
          selectedLearningOption={selectedLearningOption}
          setSelectedLearningOption={setSelectedLearningOption}
          onChangeWordsList={setWordsList}
          open={open}
          setIsOpen={setOpen}
        />

        <SettingsModal
          isOptionsOpen={isOptionsOpen}
          setIsOptionsOpen={setIsOptionsOpen}
        />
      </div>
    </Provider>
  );
}

export default App;
