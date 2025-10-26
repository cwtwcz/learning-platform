import { Link } from 'react-router-dom';
import { GraduationCap, PlayCircle, BookOpen, Award } from 'lucide-react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">
            <GraduationCap size={64} />
          </div>
          <h1 className="hero-title">Welcome to Your Learning Platform</h1>
          <p className="hero-subtitle">
            Master new skills with our comprehensive video courses.
            Learn at your own pace with expert-led content.
          </p>
          <Link to="/courses" className="cta-button">
            Explore Courses
            <PlayCircle size={20} />
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <PlayCircle size={40} />
              </div>
              <h3>High-Quality Videos</h3>
              <p>Learn from professionally produced video content designed for maximum engagement and retention.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={40} />
              </div>
              <h3>Structured Learning</h3>
              <p>Follow a well-organized curriculum with courses divided into weeks, lessons, and chapters.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Award size={40} />
              </div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry experts who bring real-world experience to every lesson.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
