import styles from './Game.module.css'

const Game = ({verifyLetter}) => {
    return (
        <div className={styles.Game}>
            <button onClick={verifyLetter}>Finalizar</button>
        </div>
    )
}

export default Game