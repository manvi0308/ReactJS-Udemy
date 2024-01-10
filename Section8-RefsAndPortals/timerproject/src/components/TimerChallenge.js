import React, { useState, useRef } from "react";
import ResultModal from "./ResultModal";
export default function TimerChallenge({ title, targetTime }) {
  const dialog = useRef(); // forwarding this ref to ResultModal.js
  const timer = useRef(); // will be component instance specific
  const [timerStarted, settimerStarted] = useState(false);
  const [timerExpired, settimerExpired] = useState(false);
  // setting timer
  function handleStart() {
    timer.current = setTimeout(() => {
      settimerExpired(true); // will run after timer expired
      dialog.current.showModal();
    }, targetTime * 1000);

    settimerStarted(true); // will run right after timer is set
  }

  function handleStop() {
    clearTimeout(timer.current);
    settimerStarted(false);
  }
  return (
    <>
   
        <ResultModal targetTime={targetTime} result="lost" ref={dialog} />
    
      <section className="challenge">
        <h2>{title} </h2>
        {timerExpired && <p>You Lost</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"}
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Timer is running " : "Start Timer"}
        </p>
      </section>
    </>
  );
}
