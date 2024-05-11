import Options from "./assets/Options"

function Question({question,answer,dispatch}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options dispatch={dispatch} answer={answer} question={question}/>
    </div>
  )
}

export default Question