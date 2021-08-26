import React  from 'react';
import '../App.css';

export const Timer = (props) => {

    const { time, mode } = props;

    const min = Math.floor(time / 1000 / 60);
    const sec = Math.floor((time / 1000) % 60);

    return (
            <div className="time-section">
                <h2 id="timer-label">{mode}</h2>
                <p id="time-left">{min}:{sec.toString().length === 1 ? "0" + sec : sec}</p>
            </div>

    )
}
