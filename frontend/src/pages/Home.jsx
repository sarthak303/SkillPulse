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


  // Inside the Home component
const featuredWorkouts = [
  { name: "Insanity", description: "High-intensity interval training program designed to push your limits" },
  { name: "CrossFit", description: "Constantly varied functional movements performed at high intensity" },
  { name: "P90X", description: "Total-body strength and conditioning program utilizing muscle confusion" }
  // Add more workout objects as needed
];

  return (
    <div className="home1">
      <div className="test">
            <div className="intro">
              <h1>Welcome to Flex Fusion</h1>
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
                <div>
                  <Link to="/faq">
                    <button className="btn">FAQ's</button>
                  </Link>
                </div>
                <div>
                  <Link to="/list">
                    <button className="btn">Workouts</button>
                  </Link>
                </div>
              </div>
            )}
          </div>

      {/* Featured Workouts */}
      <div className="featured-workouts">
      <h2>Featured Workouts</h2>
      <div className="scroll-box">
        {featuredWorkouts.map((workout, index) => (
          <div key={index} className="workout-item">
            <h3>{workout.name}</h3>
            <p>{workout.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
