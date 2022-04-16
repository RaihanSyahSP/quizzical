import React from "react";

export default function Intro(props) {
  return (
    <div className="intro-page">
      <h1 className="header">Quizzical</h1>
      <p>Some description if needed</p>
      <button type="button" className="start-btn" onClick={props.onClick}>
        Start Quiz
      </button>
    </div>
  );
}
