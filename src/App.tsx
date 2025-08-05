import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Modal from "./Modal"


interface DieObject {
    value: number
    isHeld: boolean
    id: string
}

export default function App() {
    const [dice, setDice] = useState<DieObject[]>(() => generateAllNewDice())
    const buttonRef = useRef<HTMLButtonElement>(null)

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
        
    useEffect(() => {
        if (gameWon && buttonRef.current) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function generateAllNewDice(): DieObject[] {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    
    function rollDice(): void {
        if (!gameWon) {
            setDice((oldDice: DieObject[]) => oldDice.map((die: DieObject) =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
    }

    function hold(id:string):void {
        setDice((oldDice: DieObject[]) => oldDice.map((die: DieObject) =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
      <>
        <main>
            {gameWon && <Confetti />}
            {gameWon && <Modal onClose={() => setDice(generateAllNewDice())} />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies🎲</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>

        <footer>
            <p className="footer-text">🐱2025</p>
            <p className="footer-text">Created by <a href="https://github.com/GraceC-339" target="_blank" rel="noopener noreferrer" className="footer-link">Grace C</a></p> 
            <p className="footer-text">Using React, TypeScript, and Vite</p>
        </footer>
        </>
    )
}