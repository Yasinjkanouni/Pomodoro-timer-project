import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import Duration from "./Duration";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  
  const [aria, setAria] = useState(0);

  
  const handleStop = () => { 
    setSession(null);
  setIsTimerRunning(false)
}

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
   useInterval(() => {
  
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        setSession(nextSession(focusDuration, breakDuration));
      }
  setSession(nextTick);
      const left = session.timeRemaining;
      if (session.label === "Focusing") {
        setAria((100 * (focusDuration * 60 - left)) / (focusDuration * 60));
      } else {
        setAria((100 * (breakDuration * 60 - left)) / (breakDuration * 60));
      }
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }
  const noSession = () => {
    if (session === null) return true;
    return false;
  };
  
  return (
    <div className="pomodoro">
      <Duration
        breakDuration= {breakDuration}
        focusDuration={focusDuration}
        setFocusDuration={setFocusDuration}
        setBreakDuration={setBreakDuration}
        noSession={noSession}
      />
      <Controls
        playPause={playPause}
        handleStop={handleStop}
        isTimerRunning={isTimerRunning}
        noSession={noSession}
      />
      <ProgressBar
        session={session}
        isTimerRunning={isTimerRunning}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        aria= {aria}
      />
    </div>
  );
}

export default Pomodoro;