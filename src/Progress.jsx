import React from 'react'

function Progress({numOfQuestion,index,maxPoint,answer,currPoint}) {
  return (
    <div className='progress'>
        <progress max={numOfQuestion} value={index + Number(answer!==null)}></progress>
        <p>Question <strong>{index+1}</strong> /<strong>{numOfQuestion}</strong></p>
        <p>{currPoint}/{maxPoint}</p>
    </div>

  )
}

export default Progress