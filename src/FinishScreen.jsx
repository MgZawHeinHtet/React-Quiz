import React from 'react'

function FinishScreen({maxPoints,point,highscore,dispatch}) {
  return (
    <>
    <p className="result">Your scored {point} out of {maxPoints} ({Math.floor(point/maxPoints*100)}%)</p>
    <p className="highscore">Highest score : {highscore}</p>
    <button onClick={()=>dispatch({type:"restart"})} className='btn btn-ui'>Restart Quiz</button>
    </>
  )
}

export default FinishScreen