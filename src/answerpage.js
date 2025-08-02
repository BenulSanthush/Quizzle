import React, { useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import Header from "./components/header";
import Footer from "./components/footer";



export default function AnswerPage() {
  const [quizId, setQuizId] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  const fetchQuiz = async () => {
    const docRef = doc(db, "quizzes", quizId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setQuiz(docSnap.data());
    } else {
      alert("Quiz not found");
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const saveAnswers = async () => {
    try {
      await updateDoc(doc(db, "quizzes", quizId), { answers });
      alert("Answers saved!");
    } catch (err) {
      alert("Error saving answers: " + err.message);
    }
  };

  return (

    <>
    <Header />
          <main style={{ minHeight: "calc(100vh - 120px)" }}>


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
              <textarea
                placeholder="Type your answer"
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                style={{ width: "100%", marginTop: "5px" }}
              />
            </div>
          ))}
          <button onClick={saveAnswers}>Save All Answers</button>
        </div>
      )}
    </div>

    </main>
<Footer />
</>

  );
}
