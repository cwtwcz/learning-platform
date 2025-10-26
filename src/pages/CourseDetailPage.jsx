import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Clock, BookOpen, Video, Users, Calendar } from 'lucide-react';
import courseData from '../data/course_structure.json';
import './CourseDetailPage.css';

function CourseDetailPage() {
  const course = courseData.course;
  const [expandedWeeks, setExpandedWeeks] = useState({});

  const toggleWeek = (index) => {
    setExpandedWeeks(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format duration from HH:mm:ss to HH:mm
  const formatDuration = (duration) => {
    if (!duration) return '';
    const parts = duration.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return duration;
  };

  // Calculate lesson statistics
  const getLessonStats = (lesson) => {
    let totalVideos = 0;
    let totalDuration = 0;

    lesson.chapters?.forEach(chapter => {
      totalVideos += chapter.videos?.length || 0;
    });

    return { totalVideos, duration: lesson.duration };
  };

  // Calculate week statistics
  const getWeekStats = (week) => {
    let totalLessons = week.lessons?.length || 0;
    let totalVideos = 0;
    let totalWebinars = week.webinars?.length || 0;

    week.lessons?.forEach(lesson => {
      lesson.chapters?.forEach(chapter => {
        totalVideos += chapter.videos?.length || 0;
      });
    });

    return { totalLessons, totalVideos, totalWebinars };
  };

  return (
    <div className="course-detail-page">
      <div className="course-header">
        <div className="container">
          <h1>{course.name}</h1>
          <p className="course-description">{course.description}</p>
        </div>
      </div>

      <div className="container">
        <div className="course-overview">
          {/* Course Weeks */}
          <section className="weeks-section">
            <h2 className="section-title">Course Content</h2>
            <div className="weeks-list">
              {course.weeks.map((week, weekIndex) => {
                const stats = getWeekStats(week);
                return (
                  <div key={weekIndex} className="week-card">
                    <div
                      className="week-card-header"
                      onClick={() => toggleWeek(weekIndex)}
                    >
                      <div className="week-header-content">
                        <h3>{week.name}</h3>
                        <div className="week-stats">
                          <span className="stat">
                            <BookOpen size={16} />
                            {stats.totalLessons} lessons
                          </span>
                          <span className="stat">
                            <Video size={16} />
                            {stats.totalVideos} videos
                          </span>
                          {stats.totalWebinars > 0 && (
                            <span className="stat">
                              <Users size={16} />
                              {stats.totalWebinars} {stats.totalWebinars === 1 ? 'webinar' : 'webinars'}
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="expand-button">
                        {expandedWeeks[weekIndex] ?
                          <ChevronDown size={24} /> :
                          <ChevronRight size={24} />
                        }
                      </button>
                    </div>

                    {week.description && (
                      <p className="week-description">{week.description}</p>
                    )}

                    {expandedWeeks[weekIndex] && (
                      <div className="lessons-list">
                        {week.lessons.map((lesson, lessonIndex) => {
                          const lessonStats = getLessonStats(lesson);
                          return (
                            <Link
                              key={lessonIndex}
                              to={`/course/1/week/${weekIndex}/lesson/${lessonIndex}`}
                              className="lesson-item"
                            >
                              <div className="lesson-icon">
                                <BookOpen size={20} />
                              </div>
                              <div className="lesson-info">
                                <h4>{lesson.name}</h4>
                                <div className="lesson-meta">
                                  <span>
                                    <Video size={14} />
                                    {lessonStats.totalVideos} videos
                                  </span>
                                  <span>
                                    <Clock size={14} />
                                    {formatDuration(lessonStats.duration)}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}

                        {/* Webinars for this week */}
                        {week.webinars && week.webinars.length > 0 && (
                          week.webinars.map((webinar, webinarIndex) => (
                            <Link
                              key={webinarIndex}
                              to={`/course/1/week/${weekIndex}/webinar/${webinarIndex}`}
                              className="lesson-item webinar-item"
                            >
                              <div className="lesson-icon webinar-icon">
                                <Users size={20} />
                              </div>
                              <div className="lesson-info">
                                <h4>Webinar: {webinar.name}</h4>
                                <div className="lesson-meta">
                                  <span>
                                    <Calendar size={14} />
                                    {formatDate(webinar.date)}
                                  </span>
                                  {webinar.video && (
                                    <span>
                                      <Clock size={14} />
                                      {formatDuration(webinar.video.duration)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
