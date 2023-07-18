import styles from "./EndScreen.module.css";

const endScreen = ({ retryGame, score }) => {
  return (
    <div className={styles.endScreen}>
      <h1>Fim do Jogo!</h1>
      <h2>Sua Pontuação: <span>{score}</span></h2>
      <button onClick={retryGame}>Reiniciar</button>
    </div>
  );
};

export default endScreen;
