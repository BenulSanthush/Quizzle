import React, { useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ViewPage() {
  const [quizId, setQuizId] = useState("");
  const [quizData, setQuizData] = useState(null);

  const loadQuiz = async () => {
    try {
      const docRef = doc(db, "quizzes", quizId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQuizData(docSnap.data());
      } else {
        alert("Quiz not found");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>View Quiz + Answers</h2>
      <input
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        placeholder="Enter Quiz ID"
      />
      <button onClick={loadQuiz}>Load</button>

      {quizData && (
        <div style={{ marginTop: "20px" }}>
          {quizData.questions?.map((q, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <strong>{i + 1}. {q}</strong>
              <p style={{ marginLeft: "20px", color: "green" }}>
                Answer: {quizData.answers?.[i] || "No answer submitted"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
