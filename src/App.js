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

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    //Pega uma categoria aleatória
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    //Pega uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    
    return { word, category }
  }, [words])


  //Inicia o jogo quando o botão do component StartScreen for clicado
  const startGame = useCallback(() => {
    //Limpa as letras
    clearLetterStates()
    //Pega uma palavra e uma categoria
    const { word, category } = pickWordAndCategory()

    //Cria um array de letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //Seta os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //Processa o input das letras
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //Verifica se a letra já foi utilizada
    if(
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ) { return }

    // Adiciona a letra a tela ou perde uma chance
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
      setScore((actualScore) => score + 3)
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses((actualGuesses) => guesses - 1)
      setScore((actualScore) => score - 1)
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }
  //Verifica se as chances acabaram
  useEffect(() => {
    if(guesses <= 0) {
      //Reseta todos os estados
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  //Verifica a condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    //Condição de vitória
    if(guessedLetters.length === uniqueLetters.length) {
      //Adiciona pontuação
      setScore((actualScore) => score + 10)
      //Reinicia o jogo
      startGame()
    }
  }, [guessedLetters, letters, startGame, score])

  //Reinicia o jogo
  const retryGame = () => {
    setScore(0)
    setGuesses(3)

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && 
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      }
      {gameStage === "end" && 
        <EndScreen 
          retryGame={retryGame}
          score={score} 
        />
      }
    </div>
  );
};

export default App;
