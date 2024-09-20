// AddWorkoutPage.js
import React from "react";
import WorkoutForm from "../components/WorkoutForm";
import "./addworkout.css";


const AddWorkoutPage = () => {
  return (
    <div className="wrapper">
      <div className="add-workout">
        <h2>Add Workout</h2>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default AddWorkoutPage;
