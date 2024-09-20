import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import './navbar.css';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <div className='logoname'>
            FLEX FUSION
          </div>
        </Link>
        <nav>
          <div className="nav-links">
            {user && (
              <div>
                <span>{user.email}</span>
                <button className="nav-btn" onClick={handleClick}>Log out</button>
              </div>
            )}
            {!user && (
              <div>
                <Link to="/login" className="nav-btn">Login</Link>
                <Link to="/signup" className="nav-btn">Signup</Link>
              </div>
            )}
            <Link to="/contact" className="nav-btn">Contact Us</Link>
            <Link to="/about" className="nav-btn">About Me</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;