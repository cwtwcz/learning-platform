import { Link } from 'react-router-dom';
import { GraduationCap, Home, BookOpen } from 'lucide-react';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <GraduationCap size={28} />
          <span>Learning Platform</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/courses" className="nav-link">
            <BookOpen size={18} />
            <span>Courses</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
