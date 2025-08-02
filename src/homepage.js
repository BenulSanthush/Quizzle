import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main style={{ minHeight: "calc(100vh - 120px)" }}>
    <div>
      <h2>CREATE YOUR OWN QUIZZ</h2>
      <div className="home-buttons">
    <button className="home-btn" onClick={() => navigate('/create')}>Create a Quiz</button>
    <button className="home-btn" onClick={() => navigate('/answer')}>Answer a Quiz</button>
    <button className="home-btn" onClick={() => navigate('/view')}>View Quiz + Answers</button>
  </div>
    </div>
     
    </main>
<Footer />
    </>

  );
}
