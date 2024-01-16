import React, { useState } from "react";
import QUESTIONS from "../questions";
import quizCompletedImage from "../assets/quiz-complete.png";
export default function Quiz() {
  const [useranswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = useranswers.length;
  const quizOver = QUESTIONS.length === activeQuestionIndex;
  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });

    console.log(useranswers);
  }

  if (quizOver) {
    return (
      <div id="summary">
        <h2>Quiz Completed</h2>
        <img src={quizCompletedImage} alt="" />
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <>
      <div id="quiz">
        <div id="question">
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
