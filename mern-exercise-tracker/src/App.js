import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component"

function App() {
  return (
    <div className="container">
    <Router>
    <Navbar />
    <br />
    {/* Wrap your routes in the <Routes> component */}
    <Routes>
      {/* Use the 'element' prop and wrap components in JSX */}
      <Route path="/" element={<ExercisesList />} />
      <Route path="/edit/:id" element={<EditExercise />} />
      <Route path="/create" element={<CreateExercise />} />
      <Route path="/user" element={<CreateUser />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
