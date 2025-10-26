import { Link } from 'react-router-dom';
import { Clock, BookOpen, Video } from 'lucide-react';
import courseData from '../data/course_structure.json';
import './CoursesPage.css';

function CoursesPage() {
  // For now, we'll display the single course in the JSON
  // You can extend this to support multiple courses
  const course = courseData.course;

  // Calculate total videos and duration
  const calculateCourseStats = () => {
    let totalVideos = 0;
    let totalWeeks = course.weeks.length;

    course.weeks.forEach(week => {
      week.lessons.forEach(lesson => {
        lesson.chapters.forEach(chapter => {
          totalVideos += chapter.videos.length;
        });
      });
    });

    return { totalVideos, totalWeeks };
  };

  const stats = calculateCourseStats();

  return (
    <div className="courses-page">
      <div className="page-header">
        <div className="container">
          <h1>Available Courses</h1>
          <p>Expand your knowledge with our expert-led courses</p>
        </div>
      </div>

      <div className="container">
        <div className="courses-grid">
          <div className="course-card">
            <div className="course-card-header">
              <div className="course-icon">
                <BookOpen size={32} />
              </div>
            </div>

            <div className="course-card-body">
              <h2 className="course-title">{course.name}</h2>
              <p className="course-description">{course.description}</p>

              <div className="course-stats">
                <div className="stat">
                  <Video size={18} />
                  <span>{stats.totalVideos} videos</span>
                </div>
                <div className="stat">
                  <BookOpen size={18} />
                  <span>{stats.totalWeeks} weeks</span>
                </div>
              </div>
            </div>

            <div className="course-card-footer">
              <Link to="/course/1" className="course-button">
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
