import {createMemo, createSignal, For, onCleanup, onMount} from "solid-js";
import gameStore from "../store/game-store";
import {calculateWinner} from "../store/utils";

const GameInfo = () => {
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

    const status = createMemo(() => {
        const d = data()
        const history = d.history;
        const current = history[d.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (d.xIsNext ? "X" : "O");
        }

        return status
    })

    const history = createMemo(() => {
        const d = data()
        return d.history;
    })

    return (
        <>
            <div>{status()}</div>
            <ul>
                <For each={history()}>{(item, index) =>
                    <li>
                        <button onClick={() => gameStore.jumpTo(index())}>{index() ? 'Go to move #' + index() : 'Go to game start'}</button>
                    </li>
                }</For>
            </ul>
        </>
    )
}

export default GameInfo
