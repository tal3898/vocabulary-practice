import { useState } from "react";
import { FaDice } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import wiki from "wikipedia";
import "./exampleSentence.css";
import FormData from "form-data";
import axios from "axios";

interface Props {
  spanishWord: string;
  exampleSentence: string | undefined;
  setExampleSentence: (exampleSentence: string) => void;
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const ExampleSentence = ({
  spanishWord,
  exampleSentence,
  setExampleSentence,
}: Props) => {
  const [isLoadingSentence, setIsLoadingSentence] = useState(false);

  const getRandomSentence = async (spanishWord: string) => {
    const searchFor = " " + spanishWord.toLowerCase() + " ";
    await wiki.setLang("es");
    const defaultArticle = "Anexo:Redes LTE";
    let page;
    try {
      page = await wiki.page(spanishWord.toLowerCase());
      console.log("article for the word does not exist, try random one");
    } catch (e) {
      page = await wiki.page(defaultArticle);
    }
    let content = await page.content();
    let links = await page.links();

    while (!content.toLowerCase().includes(searchFor)) {
      const randomLinkIndex = getRandomInt(links.length);
      const randomLink = links[randomLinkIndex];

      try {
        page = await wiki.page(randomLink);
        content = await page.content();
        links = await page.links();

        console.log({
          page,
          content,
        });
      } catch (e) {
        console.log("error occured while searching for a sentence");
      }
    }

    const exampleIndex = content.toLowerCase().indexOf(searchFor);
    const endOfSentencePeriod = content
      .toLowerCase()
      .indexOf(".", exampleIndex);
    const endOfSentenceComma = content.toLowerCase().indexOf(",", exampleIndex);
    const endOfSentence = Math.min(endOfSentenceComma, endOfSentencePeriod);

    const firstIndexOfPeriod = content
      .toLowerCase()
      .substring(0, exampleIndex)
      .lastIndexOf(".");
    const firstIndexOfComma = content
      .toLowerCase()
      .substring(0, exampleIndex)
      .lastIndexOf(",");
    const firstIndex = Math.max(firstIndexOfPeriod, firstIndexOfComma);
    const randomSentence = content.substring(firstIndex + 1, endOfSentence);
    console.log({ randomSentence });
    return randomSentence;
  };

  const loadRandomSentence = async () => {
    setIsLoadingSentence(true);
    const randomSentence = await getRandomSentence(spanishWord);
    console.log({
      word: spanishWord,
      sentence: randomSentence,
    });
    setExampleSentence(randomSentence);
    setIsLoadingSentence(false);
  };

  const randomSentenceApi = async () => {
    debugger;
    const bodyFormData = new FormData();
    bodyFormData.append("lang", "es");
    bodyFormData.append("contain", "calidad");
    bodyFormData.append("quantity", 6);

    const config = {
      withCredentials: false,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(
      "https://www.coolgenerator.com/random-sentence-generator",
      bodyFormData,
      config
    );
    console.log({ response });
  };

  return (
    <div>
      {!isLoadingSentence && (
        <div className="exampleSentence" onClick={randomSentenceApi}>
          <div className="exampleSentenceRandomBtn">
            <FaDice />
          </div>
          {exampleSentence ?? "Click to get example sentence"}
        </div>
      )}
      {isLoadingSentence && (
        <div className="exampleSentenceLoader">
          <ClipLoader size={11} color="#36d7b7" />
        </div>
      )}
    </div>
  );
};
