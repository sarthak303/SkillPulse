import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom"; // Import Link for the Analyse button
import "./home.css";

const Home = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const introTimeout = setTimeout(() => {
      setShowButtons(true);
    }, 1000);

    const fadeTimeout = setTimeout(() => {
      setFadeIn(true);
    }, 500); // Adjust the timing as needed

    return () => {
      clearTimeout(introTimeout);
      clearTimeout(fadeTimeout);
    };
  }, []);

  const handleExploreClick = () => {
    navigate('/explore'); // Redirect to Explore page
  };

  return (
    <div className={`home1 ${fadeIn ? 'visible' : ''}`}>
      <div className="heading-container">
        <h1 className="heading">Revolutionize Your Sports Performance with AI-Powered Analytics</h1>
      </div>
      <div className="description-container">
        <p className="description">The AI-Powered Sports Performance Analyzer is a versatile tool designed to help athletes improve their game by analyzing video footage and stats in real-time.</p>
      </div>
      {showButtons && (
        <div className="buttons">
          <div>
            <button className="btn-explore" onClick={handleExploreClick}>Explore</button> {/* Update this button */}
          </div>
          <div>
            <Link to="/add-workout">
              <button className="btn-analyse">Analyse</button>
            </Link>
          </div>
        </div>
      )}
      {/* <Explore /> */}
    </div>
  );
};

export default Home;
