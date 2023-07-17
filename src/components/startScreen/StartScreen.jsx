import styles from "./StartScreen.module.css";

const StartScreen = ({ startGame }) => {
  return (
    <div className={styles.StartScreen}>
      <h1>Secret Word</h1>
      <p>Clique no botão para iniciar o jogo!</p>
      <button onClick={startGame}>Jogar</button>
    </div>
  );
};

export default StartScreen;
