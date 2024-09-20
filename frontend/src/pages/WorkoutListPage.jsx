import React from 'react';
import { Link } from 'react-router-dom';

function WorkoutListPage() {
  // Define workout data
  const workouts = [
    { id: "crunches", name: "Crunches", videoId: "Xyd_fa5zoEU" },
    { id: "curls", name: "Curls", videoId: "ykJmrZ5v0Oo" },
    { id: "squats", name: "Squats", videoId: "MVMNk0HiTMg" },
  ];

  return (
    <div className='contact-us'>
      <h1>Workouts</h1>
      <ul>
        {workouts.map(workout => (
          <li key={workout.id}>
            <Link to={`/workout/${workout.id}`}>
              <h3>{workout.name}</h3>
            </Link>
            <div>
              <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${workout.videoId}`} 
                title={workout.name} 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutListPage;
