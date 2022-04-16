import React from "react";
import Options from "./Options";

export default function Quiz(props) {
  const quizElements = props.quiz.map((item) => {
    return (
      <fieldset key={item.id} nama={item.id} className="quiz">
        <legend>{item.question}</legend>
        {item.allAnswers.map((option, index) => {
          return <Options itemId={item.id} key={index} handleChange={props.handleChange} option={option} name={item.id} checked={item.userAnswer === option} correct_answer={item.answer === option} gameOn={props.gameOn} />;
        })}
      </fieldset>
    );
  });
  return (
    <section className="quizes-div">
      {quizElements}
      {props.gameOn && (
        <button type="button" className="check" onClick={props.checkAnswers}>
          Check Answers
        </button>
      )}
      {!props.gameOn && (
        <h5 className="score">
          You scored {props.quiz[0].score}/{props.quiz.length}
        </h5>
      )}
      {!props.gameOn && (
        <button type="button" className="check" onClick={props.playAgain}>
          Play Again
        </button>
      )}
    </section>
  );
}
