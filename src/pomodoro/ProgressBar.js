import React from "react";


function ProgressBar({ session, focusDuration, breakDuration, aria,isTimerRunning }) {
  if (session === null) return null;

  function MinutestoSeconds(seconds) {
    return (seconds - (seconds %= 60)) / 60 + (9 < seconds? ":" : ":0") + seconds;
  }
  
  return (
    <div>
      {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
      {session && (
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {/* {session ? ` Focusing for ${focusDuration}:00 minutes`: "" } */}
              {session && session.label} for{" "}
                {(
                  "0" +
                  (session.label.toLowerCase().indexOf("ocus") > 0
                    ? focusDuration
                    : breakDuration)
                ).substr(-2)}
                :00 minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {/*{session?.timeRemaining} remaining */}
              
              {session && MinutestoSeconds 
(session.timeRemaining)} remaining
            </p>
            {!isTimerRunning && <h2>PAUSED</h2>}
          </div> 
        </div>
        )}
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow= {aria}// TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${aria}%` }}// TODO: Increase width % as elapsed time increases
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;