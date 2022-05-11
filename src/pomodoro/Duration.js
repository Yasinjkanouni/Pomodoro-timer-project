import React from "react";


function Duration({
  breakDuration,
  focusDuration,
  setFocusDuration,
  setBreakDuration,
 noSession,
}) {
    const disableButton= !noSession();
    console.log(disableButton);
    
  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {("0" + focusDuration).substr(-2)}:00
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button onClick = {()=> setFocusDuration((currentDuration) => Math.max(5, currentDuration - 5))}
              
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus" 
                disabled={disableButton}
            

              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button onClick = {()=> setFocusDuration((currentDuration) => Math.min(60, currentDuration + 5))}
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                disabled={disableButton}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {("0" + breakDuration).substr(-2)}:00
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button onClick = {()=> setBreakDuration((currentDuration) => Math.max(1, currentDuration - 1))}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  disabled={disableButton}  
                  
                           
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button onClick = {()=> setBreakDuration((currentDuration) => Math.min(15, currentDuration + 1))}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  disabled={disableButton}
                >
                  <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Duration;