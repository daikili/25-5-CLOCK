import React from 'react';
import '../App.css';

export const ChangeBreak = (props) => {


  const { increment, decrement, length } = props;


    return (
        <div>
            <div className="length__breakTime">
                <h2 id="break-label">Break time</h2>
                <button id="break-decrement" onClick={decrement}>-</button>
                <span id="break-length">{length / 60}</span>
                <button id="break-increment" onClick={increment}>+</button>
            </div>
        </div>
    )
}
