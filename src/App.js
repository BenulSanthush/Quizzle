import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./homepage";
import AnswerPage from "./answerpage";
import ViewPage from "./ViewPage.js";
import CreateQuiz from "./createquizz"; 
import './App.css';


function App() {
  return (
    <Router basename="/Quizzle">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/answer" element={<AnswerPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}


export default App;
