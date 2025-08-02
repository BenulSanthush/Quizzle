import React, { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateQuiz() {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizId, setQuizId] = useState("");

  const handleAdd = () => {
    if (!question.trim()) return;
    if (questions.length >= 50) {
      alert("Max 50 questions allowed");
      return;
    }
    setQuestions([...questions, question.trim()]);
    setQuestion("");
  };

  const handleRemove = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "quizzes"), {
        questions,
        /*createdBy: auth.currentUser.uid,*/
        createdAt: serverTimestamp(),
      });
      setQuizId(docRef.id);
      alert("Quiz created!");
      setQuestions([]);
    } catch (err) {
      alert("Error creating quiz: " + err.message);
    }
  };

  return (
    <div>
      <h2>Create a Quiz (Max 50 Questions)</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type a question"
          style={{ flex: 1 }}
        />
        
        <button onClick={handleAdd} className="button-add">➕</button>

      </div>
<div className="question-list-container">
 <ul style={{ listStyleType: "none", padding: 0, width: "100%" }}>
  {questions.map((q, i) => (
    <li
      key={i}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 15px",
        borderBottom: "1px solid #ccc",
        margin: "5px 0",
        backgroundColor: "#f9f9f9",
        borderRadius: "6px",
      }}
    >
      <span>{i + 1}. {q}</span>
     <button onClick={() => handleRemove(i)} className="button-delete">❌</button>

    </li>
  ))}
</ul>
</div>

      {questions.length > 0 && (
  <>
    
    <button onClick={handleSubmit} className="button-submit">Submit Quiz</button>
  </>
)}


     

      {quizId && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Quiz ID:</strong> {quizId}</p>
          <button onClick={() => navigator.clipboard.writeText(quizId)}>
            Copy Code
          </button>
        </div>
      )}
    </div>
  );
}
