import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StarterPage from "./assets/StarterPage";
import Question from "./Question.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress.jsx";
import FinishScreen from "./FinishScreen.jsx";
import Timer from "./Timer.jsx";
import Footer from "./Footer.jsx";

const initialState = {
  questions: [],
  // loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  highscore: 0,
  timer : null,
 
};

const SEC_PER_QUESTION = 30

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "failStage":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active",timer : SEC_PER_QUESTION * state.questions.length };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.point > state.highscore ? state.point : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case 'tick' :
      return {...state,timer : state.timer - 1 ,status : state.timer===0 ? "finish" : state.status}

    default:
      break;
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, point, highscore ,timer} = state;
  const numOfQuestion = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "failStage" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StarterPage dispatch={dispatch} numOfQuestion={numOfQuestion} />
        )}
        {status === "active" && (
          <>
            <Progress
              answer={answer}
              currPoint={point}
              maxPoint={maxPossiblePoints}
              numOfQuestion={numOfQuestion}
              index={index}
            />
            <Question
           
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <Footer>
              <Timer timer={timer} dispatch={dispatch}/>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestion={numOfQuestion}
              />
            </Footer>
          </>
        )}

        {status === "finish" && (
          <FinishScreen
            maxPoints={maxPossiblePoints}
            point={point}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </main>
    </div>
  );
}
