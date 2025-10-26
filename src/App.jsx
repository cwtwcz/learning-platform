import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import WebinarPage from './pages/WebinarPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/course/:id/week/:weekIndex/lesson/:lessonIndex" element={<LessonPage />} />
          <Route path="/course/:id/week/:weekIndex/webinar/:webinarIndex" element={<WebinarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
