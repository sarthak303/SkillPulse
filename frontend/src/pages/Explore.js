import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './explore.css';

const Explore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay for fade-in effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`explore-container1 ${isVisible ? 'fade-in' : ''}`}>
      <div className="heading-container1">
        {/* <h1 className="sub-heading-small">Unlock Your Potential</h1> */}
      </div>
      <div className="description-container1">
        <h2 className="sub-heading1">Analyze Your Game</h2>
        <p className="description-small1">
          Our proprietary AI algorithms analyze every facet of your performance, from body mechanics to decision-making, providing you with detailed insights to optimize your training and competition.
        </p>
      </div>
      <div className="description-container1">
        <h2 className="sub-heading-small1">Elevate Your Performance</h2>
        <p className="description-small1">
          Whether you're an athlete, coach, or sports enthusiast, AI-powered analytics can revolutionize your journey, offering data-driven recommendations that take your game to the next level.
        </p>
      </div>
      <div className="button-container1">
        <Link to="/sports">
          <button className="btn-explore1">Get Started</button>
        </Link>
        <Link to="/">
          <button className="btn-analyse1">Return to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default Explore;
