import styles from './EndScreen.module.css'

const endScreen = ({retryGame}) => {
    return (
        <div className={styles.EndScreen}>
            <button onClick={retryGame}>Reiniciar</button>
        </div>
    )
}

export default endScreen