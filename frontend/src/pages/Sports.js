import React from 'react';
import { Link } from 'react-router-dom';
import './Sports.css';

const Sports = () => {
    const sportsData = [
        { id: 1, title: 'Cricket', image: require('../assets/sport4.png') },
        { id: 2, title: 'Football', image: require('../assets/sport2.png') },
        { id: 3, title: 'Tennis', image: require('../assets/sport3.png') },
        { id: 4, title: 'Badminton', image: require('../assets/sport1.png') },
    ];
    
    return (
        <div className="sports-container">
            {sportsData.map((sport) => (
                <div className="sport-card" key={sport.id}>
                    <img src={sport.image} alt={sport.title} className="sport-image" />
                    <h3 className="sport-title">{sport.title}</h3>
                    <div className="button-container1">
                        <Link to={`/sports/${sport.title.toLowerCase()}`}>
                            <button className="btn-explore1">Get Started</button>
                        </Link>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sports;
