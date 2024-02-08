export default function GameBoard({onSelectSquare, board}){

    return(
        <ol id="game-board">
            {board.map((row, rwoIndex) => (
            <li key={rwoIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                    <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rwoIndex, colIndex)} disabled={playerSymbol !== null}>
                            {playerSymbol}
                        </button>
                    </li>
                    ))}
                </ol>
            </li>
            ))}
        </ol>        
    )
}