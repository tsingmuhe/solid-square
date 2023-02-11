import Board from "./Board";
import GameInfo from "./GameInfo";

const Game = () => {
    return (
        <div class="game">
            <div class="game-board">
                <Board/>
            </div>
            <div class="game-info">
                <GameInfo/>
            </div>
        </div>
    )
}

export default Game
