import React, { useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import Header from "./components/header";
import Footer from "./components/footer";

export default function AnswerQuiz() {
  const [quizId, setQuizId] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  const [viewId, setViewId] = useState("");
  const [viewData, setViewData] = useState(null); 

  const fetchQuiz = async () => {
    try {
      const docRef = doc(db, "quizzes", quizId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQuiz(docSnap.data());
      } else {
        alert("Quiz not found");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const saveAnswers = async () => {
    try {
      const docRef = doc(db, "quizzes", quizId);
      await updateDoc(docRef, {
        answers: answers,
      });
      alert("Answers saved!");
    } catch (err) {
      alert("Error saving answers: " + err.message);
    }
  };

const loadAnswers = async () => {
  try {
    const docRef = doc(db, "quizzes", viewId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setViewData(docSnap.data());
    } else {
      alert("Quiz not found");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
};

  return (

<div>

    <h2>Answer a Quiz</h2>
    <input
      value={quizId}
      onChange={(e) => setQuizId(e.target.value)}
      placeholder="Enter Quiz ID"
    />
    <button onClick={fetchQuiz}>Load Quiz</button>

    {quiz?.questions?.length > 0 && (
      <div style={{ marginTop: "20px" }}>
        {quiz.questions.map((q, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <strong>{i + 1}. {q}</strong>
            <div>
              <textarea
                placeholder="Type your answer"
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                style={{ width: "100%", marginTop: "5px" }}
              />
            </div>
          </div>
        ))}
        <button onClick={saveAnswers}>Save All Answers</button>
      </div>
    )}

    {}
    <hr />
    <h2>View Quiz + Answers</h2>
    <input
      value={viewId}
      onChange={(e) => setViewId(e.target.value)}
      placeholder="Enter Quiz ID"
      style={{ marginBottom: "5px" }}
    />
    <button onClick={loadAnswers}>Load Answers</button>

    {viewData && (
      <div style={{ marginTop: "20px" }}>
        {viewData.questions?.map((q, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <strong>{i + 1}. {q}</strong>
            <p style={{ marginLeft: "20px", color: "green" }}>
              Answer: {viewData.answers?.[i] || "No answer submitted"}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

}
