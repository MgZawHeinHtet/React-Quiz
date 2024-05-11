import React from "react";

function NextButton({ dispatch, answer, index, numOfQuestion }) {
  if (index === numOfQuestion - 1) {
    return (
      <>
        {answer !== null ? (
          <button
            onClick={() => dispatch({ type: "finish" })}
            className="btn btn-ui"
          >
            Finish
          </button>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return (
      <>
        {answer !== null ? (
          <button
            onClick={() => dispatch({ type: "nextQuestion" })}
            className="btn btn-ui"
          >
            Next
          </button>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default NextButton;
