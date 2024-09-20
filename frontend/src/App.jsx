import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import WorkoutList from './pages/WorkoutList'
import AddWorkout from './pages/AddWorkout'
import Navbar from './components/Navbar'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import About from './pages/about'
import Faq from './pages/faqpage'
import WorkoutListPage from './pages/WorkoutListPage'



function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/workouts" element={<WorkoutList />} />
            <Route path="/add-workout" element={<AddWorkout />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/list" element={<WorkoutListPage />} />
          </Routes>
        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
