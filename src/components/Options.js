import React from "react";

export default function Options(props) {
  let styles;
  if (props.gameOn && props.checked) {
    styles = {
      background: "#D6DBF5",
    };
  } else if (!props.gameOn) {
    styles = {
      background: props.correct_answer ? "cyan" : props.checked ? "pink" : "white",
    };
  }
  //   console.log(props.option);

  return (
    <div className="option">
      <label htmlFor={props.id} className="option-label" style={styles}>
        {props.option}
        <input onChange={props.handleChange} type="radio" name={props.name} id={props.id} value={props.option} data-answer={props.correct_answer}></input>
      </label>
    </div>
  );
}
