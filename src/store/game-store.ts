import {BehaviorSubject, Observable} from "rxjs";
import {calculateWinner} from "./utils";

class GameStore {
    private _state$ = new BehaviorSubject<any>({
        history: [
            {
                squares: Array(9).fill(null)
            }
        ],
        stepNumber: 0,
        xIsNext: true,
    });

    select(): Observable<any> {
        return this._state$;
    }

    getValue() {
        return this._state$.value;
    }

    handleClick(i: number) {
        const preState = this._state$.value
        const history = preState.history.slice(0, preState.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = preState.xIsNext ? "X" : "O";

        this._state$.next({
            ...preState,
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !preState.xIsNext
        })
    }

    jumpTo(step: number) {
        const preState = this._state$.value
        this._state$.next({
            ...preState,
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
}

const gameStore = new GameStore()
export default gameStore
