import React from 'react';
import '../App.css';

export const ChangeSession = (props) => {

  const { increment, decrement, length } = props;
    return (
        <div>
            <div className="length__sessionLabel">
                <h2 id="session-label">Session label</h2>
                <button id="session-decrement" onClick={decrement}>-</button>
                    <span id="session-length">{length / 60}</span>
                <button id="session-increment" onClick={increment} >+</button>
            </div>
        </div>
    )
}
