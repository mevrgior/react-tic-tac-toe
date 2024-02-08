export default function GameOver({winner, onRestart}){
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner ? <p>{winner} hat gewonnen!!! </p> : <p>It&apos;s a draw</p>}
            <button onClick={onRestart}>Try again!</button>
        </div>
    );
}