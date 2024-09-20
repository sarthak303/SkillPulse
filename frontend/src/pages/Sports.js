import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import './Sports.css';

const Sports = () => {
  const sportsData = [
    { id: 1, title: 'Badminton', image: require('../assets/sport1.png') },
    { id: 2, title: 'Football', image: require('../assets/sport2.png') },
    { id: 3, title: 'Tennis', image: require('../assets/sport3.png') },
    { id: 4, title: 'Cricket', image: require('../assets/sport4.png') },
  ];

  return (
    <div className="sports-page">
      <HorizontalScrollCarousel sportsData={sportsData} />
    </div>
  );
};

const HorizontalScrollCarousel = ({ sportsData }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-33.33%"], // Adjusted for 3x duplication
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 15, // Speed of the automatic scroll
        },
      },
    });
  }, [controls]);

  // Duplicate data for infinite scroll effect
  const clonedSportsData = [...sportsData, ...sportsData, ...sportsData];

  return (
    <div className="carousel-container">
      <motion.div animate={controls} className="carousel">
        {clonedSportsData.map((sport, index) => (
          <div className="sport-card" key={index}>
            <img src={sport.image} alt={sport.title} className="sport-image" />
            <h3 className="sport-title">{sport.title}</h3>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Sports;
