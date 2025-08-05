import type { JSX } from 'react'

interface DieProps {
    value: number
    isHeld: boolean
    hold: () => void
}


export default function Die(props: DieProps):JSX.Element {
    const styles: {backgroundColor: string, color: string} = {
        backgroundColor: props.isHeld ? "#FD8B51" : "#F2E5BF",
        color: "#257180"
    }
    
    return (
        <button 
            style={styles}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}