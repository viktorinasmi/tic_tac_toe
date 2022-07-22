import React, {useState}  from "react";
import Board from "../Board/Board";
import {calculateWinner} from "../helper";

import './Game.css';



//Компонент логики игры

const Game = () => {

    const [board, setBoard] = useState(Array(9).fill(null)); //для доски состояние
    const [xIsNext, setXIsNext] =useState(true); //определение чей ход- первый крестик ходит
    const winner =calculateWinner(board); //определение победителя

    const isDraw = !winner && board.every(item => item !== null);
    console.log({
        board,
        isDraw
    })

    //функция, которая отвечает за клик по ячейке
    const handleClick =(index) => {
        const boardCopy = [...board]

        //определить, был ли клик по ячейке, или игра закончена
        if (winner || boardCopy[index]) {
            return null
        }

        //Определяем чей ход - X O
        boardCopy[index] = xIsNext ? 'X' : 'O'

        //Обновить состояние - меняется при каждом клике
        setBoard(boardCopy);
        setXIsNext(!xIsNext);
    }

    //кнопка начать заново
    const startNewGame = () =>{
        return(
            <button
                className="start__btn"
                onClick={() => setBoard(Array(9).fill(null))}>
                Очистить поле
            </button>
        )
    }

    let resultText = '';
    if (isDraw){
        resultText = `Ничья`
    } else {
        resultText =`Сейчас ходит ${(xIsNext ? 'X' : 'O')}`
    }
    if (winner) {
        resultText = `Победитель ${winner}`
    }


    return (
        <div className="wrapper">
            {startNewGame()}
            <Board squares={board} click={handleClick}/>
            <p className="game__info">
                {resultText}
            </p>
        </div>
    )
}

export default Game;