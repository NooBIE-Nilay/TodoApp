import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div>
          <h1>Todo App</h1>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
