import React,{useState ,useEffect} from 'react';
import './App.css';
import {ChangeBreak} from './components/ChangeBreak';
import {ChangeSession} from './components/ChangeSession';
import {Timer} from './components/timer'
function App() {

  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [mode, setMode] = useState("Session");
  const [timeLeft, setTimeLeft] = useState();
  const [isActive, setIsActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [beep] = useState(new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"));
  const [beepPlaying, setBeepPlaying] = useState(false);


  useEffect(() => {
    setTimeLeft(mode === "Session" ? sessionLength * 1000 : breakLength * 1000);
  }, [sessionLength, breakLength]);


  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 1) {
      setTimeLeft(
        mode == "Session" ? sessionLength * 1000 - timeSpent : breakLength * 1000 - timeSpent
      );

      interval = setInterval(() => {
        setTimeSpent((timeSpent) => timeSpent + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    //si el tiempo llega a 0 activo el sonido
    if (timeLeft === 0) {
      beep.play();
      setBeepPlaying(true);
      setTimeSpent(0);
      setMode((mode) => (mode == "Session" ? "break" : "Session"));
      setTimeLeft(
        mode == "Session" ? sessionLength * 1000 : breakLength * 1000
      );
    }
    return () => clearInterval(interval);
  }, [isActive, timeSpent]);


  useEffect(() => {
    beep.addEventListener("ended", () => setBeepPlaying(false));
    return () => {
      beep.addEventListener("ended", () => setBeepPlaying(false));
    };
  }, []);

  function toggleIsActive() {
    setIsActive(!isActive);
  }



 //INCREMENTOS BREAK
  function decrementBreak() {

    setBreakLength(breakLength - 60 > 60 ? breakLength - 60 : 60);
  }

  function incrementBreak() {
    setBreakLength(breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60);
  }

  //INCREMENTO SESION
  function decrementSession() {
    setSessionLength(sessionLength - 60 > 60 ? sessionLength - 60 : 60);
  }

  function incrementSession() {
    setSessionLength(sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60);
  }


  function reset() {
    /*PASO TODO   A COMO ESTABA EL ESTADO INICIAL AL PRINCIPIO*/
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(mode == "Session" ? sessionLength * 1000 : breakLength * 1000);

    if (isActive) {
      setIsActive(false);
      setTimeSpent(0);
    }

    if (beepPlaying) {
      beep.pause();
      beep.currentTime = 0;
      setBeepPlaying(false);
    }
  }

  return (
    <div className="container">

      <h1>25 + 5 Clock</h1>

      <div className="length">

      <ChangeBreak
                length={breakLength}
                decrement={decrementBreak}
                increment={incrementBreak}
      />
      <ChangeSession
                length={sessionLength}
                decrement={decrementSession}
                increment={incrementSession}
                      
      />
      

      </div>
      <Timer
          time={timeLeft} mode={mode}
      />



      <div className="time-control">

              <button id="start_stop" onClick={toggleIsActive}>▶</button>
              <button id="start_stop" onClick={toggleIsActive}>❚❚</button>
              <button id="reset" onClick={reset}>⟳</button>

      </div>


    </div>
  );
}

export default App;
