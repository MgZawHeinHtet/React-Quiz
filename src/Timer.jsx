import React, { useEffect } from "react";

function Timer({ timer, dispatch }) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
        return function(){
        clearInterval(id)
    }
    },
    [dispatch]
  
  );
  return <div className="timer"> {timer >60 ? `${Math.floor(timer / 60)  }mins :` : '' }  {timer%60} sec</div>;
}

export default Timer;
