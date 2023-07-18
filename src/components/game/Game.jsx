import { useState, useRef } from "react";
import styles from "./Game.module.css";

const Game = ({ 
  verifyLetter, pickedWord, pickedCategory, 
  letters, guessedLetters, wrongLetters, 
  guesses, score 
}) => {
  const [letter, setLetter] = useState([])
  const letterInputRef = useRef(null)

  const handleSubmit = (ev) => {
    ev.preventDefault()

    verifyLetter(letter)
    setLetter("")

    letterInputRef.current.focus()
  }

  return (
    <div className={styles.game}>
      <p className={styles.points}>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a Palavra</h1>
      <h3 className={styles.tip}>
        Dica: <span>{pickedCategory}</span>
      </h3>
      <p>Você tem {guesses} Chances</p>

      <div className={styles.wordContainer}>
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className={styles.letter}>{letter}</span>
          ) : (
            <span key={i} className={styles.blankSquare}></span>
          )
        ))}
      </div>

      <div className={styles.letterContainer}>
        <p>Digite uma letra!</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" maxLength="1" required
            onChange={(ev) => setLetter(ev.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Tentar</button>
        </form>
      </div>

      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>
    </div>
  );
};

export default Game;
