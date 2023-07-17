//Css
import "./App.css";
//React
import { useCallback, useEffect, useState } from "react";
//Data
import { wordsList } from "./data/words";
//Components
import StartScreen from "./components/startScreen/StartScreen";
import Game from "./components/game/Game";
import EndScreen from "./components/endScreen/EndScreen";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const App = () => {
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);

  //Inicia o jogo quando o botão do component StartScreen for clicado
  const startGame = () => {
    setGameStage(stages[1].name);
  };

  //Processa o input das letras
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  //Reinicia o jogo
  const retryGame = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <EndScreen retryGame={retryGame} />}
    </div>
  );
};

export default App;
