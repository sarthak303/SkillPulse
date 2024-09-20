import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const introTimeout = setTimeout(() => {
      setShowButtons(true);
    }, 1000); 

    return () => clearTimeout(introTimeout);
  }, []);

  return (
    <div className="home1">
      <div className="intro">
        <h1>Welcome to Workout Buddy</h1>
      </div>
      <div className="description">
        <p>Your go-to app for tracking and adding workouts!</p>
      </div>
      {showButtons && (
        <div className="buttons">
          <div>
            <Link to="/workouts">
              <button className="btn">View Workouts</button>
            </Link>
          </div>
          <div>
            <Link to="/add-workout">
              <button className="btn">Add Workout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
