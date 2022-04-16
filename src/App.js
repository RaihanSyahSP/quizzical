import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => ({
    intro: true,
    quiz: false,
  }));

  const [quiz, setQuiz] = useState(() => []);
  const [gameOn, setGameOn] = useState(() => true);
  const [count, setCount] = useState(() => 0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const quizArray = [];
        data.results.forEach((datum, index) => {
          datum = {
            question: datum.question,
            answer: datum.correct_answer,
            incorrect_answers: datum.incorrect_answers,
            allAnswers: [...datum.incorrect_answers, datum.correct_answer],
            id: index,
            userAnswer: "",
          };
          quizArray.push(datum);
        });
        setQuiz(quizArray);
      });
  }, [count]);

  function switchPages() {
    setCurrentPage((prev) => {
      return {
        ...prev,
        intro: !prev.intro,
        quiz: !prev.quiz,
      };
    });
  }

  function checkAnswers() {
    const allUserAnswers = quiz.map((item) => item.userAnswer);
    const answers = quiz.map((item) => item.answer);

    let score = 0;
    for (let i = 0; i < allUserAnswers.length; i++) {
      if (allUserAnswers[i] === answers[i]) {
        score = score + 1;
      }
    }

    setGameOn((prev) => !prev);
    setQuiz((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          score: score,
        };
      });
    });
  }

  function playAgain() {
    setCount((prev) => prev + 1);
    setGameOn((prev) => !prev);
  }

  function compileUserAnswers() {
    const newArray = [];
    // eslint-disable-next-line no-restricted-globals
    const { type, name, checked, value } = event.target;

    //nyimpen jawaban user
    quiz.forEach((item) => {
      if (item.id === Number(name)) {
        item = {
          ...item,
          userAnswer: value,
        };
        newArray.push(item);
      } else {
        newArray.push(item);
      }
    });
    setQuiz(newArray);
  }

  console.log(quiz);

  return (
    <>
      {currentPage.intro && (
        <main className="intro-main">
          <Intro onClick={switchPages} />
        </main>
      )}

      {currentPage.quiz && (
        <main>
          <Quiz onClick={switchPages} quiz={quiz} handleChange={compileUserAnswers} checkAnswers={checkAnswers} gameOn={gameOn} playAgain={playAgain} />
        </main>
      )}
    </>
  );
}
