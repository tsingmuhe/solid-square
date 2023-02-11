import gameStore from "../store/game-store";
import {createMemo, createSignal, onCleanup, onMount} from "solid-js";

const Board = () => {
    const [data, setData] = createSignal(gameStore.getValue())

    onMount(() => {
        const subscription = gameStore.select().subscribe({
            next(value: any): void {
                setData(value)
            }
        })

        onCleanup(() => {
            subscription.unsubscribe()
        })
    })

    const currentSquare = createMemo(() => {
        const d = data()
        const history = d.history;
        const current = history[d.stepNumber];
        return current.squares
    })

    return (
        <div class="game-board">
            <div class="board-row">
                <Square value={currentSquare()[0]} onClick={() => gameStore.handleClick(0)}/>
                <Square value={currentSquare()[1]} onClick={() => gameStore.handleClick(1)}/>
                <Square value={currentSquare()[2]} onClick={() => gameStore.handleClick(2)}/>
            </div>
            <div class="board-row">
                <Square value={currentSquare()[3]} onClick={() => gameStore.handleClick(3)}/>
                <Square value={currentSquare()[4]} onClick={() => gameStore.handleClick(4)}/>
                <Square value={currentSquare()[5]} onClick={() => gameStore.handleClick(5)}/>
            </div>
            <div class="board-row">
                <Square value={currentSquare()[6]} onClick={() => gameStore.handleClick(6)}/>
                <Square value={currentSquare()[7]} onClick={() => gameStore.handleClick(7)}/>
                <Square value={currentSquare()[8]} onClick={() => gameStore.handleClick(8)}/>
            </div>
        </div>
    )
}

const Square = (props: any) => {
    return (
        <button class="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default Board
