import React, { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompletedImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
export default function Quiz() {
  const [useranswers, setUserAnswers] = useState([]);
  const [answerState, setanswerState] = useState("");
  const activeQuestionIndex = useranswers.length;
  const quizOver = QUESTIONS.length === activeQuestionIndex;
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setanswerState("answered");

      setUserAnswers((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          // its the right answer
          answerState("correct");
        } else {
          answerState("wrong");
        }
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);
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
          {/* key will be basically used to unmount and demount when key changes -- when question changes */}
          <QuestionTimer
            key={activeQuestionIndex}
            timeout={10000}
            onTimeOut={handleSkipAnswer}
          />
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
