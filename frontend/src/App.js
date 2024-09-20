import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Explore from './pages/Explore'; 
import WorkoutList from './pages/WorkoutList';
import AddWorkout from './pages/AddWorkout';
import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import About from './pages/about';
import Sports from './pages/Sports'; 

function App() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    if (location.pathname === '/explore') {
      body.classList.add('bg-explore');
      body.classList.remove('bg-default', 'bg-sports');
    } else if (location.pathname === '/sports') {
      body.classList.add('bg-sports');
      body.classList.remove('bg-default', 'bg-explore');
    } else {
      body.classList.add('bg-default');
      body.classList.remove('bg-explore', 'bg-sports');
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/add-workout" element={<AddWorkout />} />
          <Route path="/sports" element={<Sports />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
