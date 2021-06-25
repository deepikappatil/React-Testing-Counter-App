import React, {useState} from 'react'
import './Counter.css'

const Counter = () => {
    const [counterValue, setCounterValue] = useState(0);
    const [inputValue, setInputValue] = useState(1);

    const addToCounter = () => {
        setCounterValue(counterValue + inputValue);
    }

    const subtractFromCounter = () => {
        setCounterValue(counterValue - inputValue);
    }

    return (
        <div>
            <h3 data-testid="header">My Counter</h3>
            <h2 
                data-testid="counter"
                className={`${counterValue >= 100 ? "green" : ""} ${counterValue <= -100 ? "red" : ""}`}
            >
                {counterValue}
            </h2>
            <button 
                data-testid="subtract-btn"
                onClick={subtractFromCounter}
            >
            -
            </button>
            <input 
                className="text-center" 
                type="number" 
                data-testid="input" 
                value={inputValue}
                onChange={(e) => {
                    setInputValue(parseInt(e.target.value));
                }} 
            />
            <button 
                data-testid="add-btn"
                onClick={addToCounter}
            >
            +
            </button>
        </div>
    )
}

export default Counter
