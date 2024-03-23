import React, { useState, useEffect } from "react";
import Result from "./result";
import QueryCard from "./query-card";
import { Loader } from "lucide-react";
const MainSection = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState({
    isChosen: false,
    option: "",
  });
  const getQuestions = async () => {
    try {
      const res = await fetch("https://the-trivia-api.com/v2/questions");
      if (res.ok) {
        const query = await res.json();
        setQuestions(query.splice(0, 3));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  console.log(questions.length, currentQuestionIndex);
  const handleAnswerSelection = (option) => {
    setChosen({ isChosen: true, option });
    setScore((prevScore) =>
      questions[currentQuestionIndex].correctAnswer === option
        ? prevScore + 1
        : prevScore
    );
  };

  const handleProceed = () => {
    setChosen({ ...chosen, isChosen: false });
    if (currentQuestionIndex === questions.length) return;
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleRestart = () => {
    getQuestions();
    setCurrentQuestionIndex(0);
    setScore(0);
    setChosen({ ...chosen, isChosen: false });
  };

  return (
    <>
      {questions.length === 0 ? (
        <Loader className="loader" />
      ) : currentQuestionIndex === questions.length ? (
        <Result score={score} onRestart={handleRestart} />
      ) : (
        <QueryCard
          onProceed={handleProceed}
          onSelection={handleAnswerSelection}
          chosen={chosen}
          question={questions[currentQuestionIndex].question.text}
          options={[
            ...questions[currentQuestionIndex].incorrectAnswers,
            questions[currentQuestionIndex].correctAnswer,
          ]}
          difficulty={questions[currentQuestionIndex].difficulty}
        />
      )}
    </>
  );
};

export default MainSection;
