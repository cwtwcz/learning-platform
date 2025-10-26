import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, ChevronDown, ChevronRight, FileImage, Video, Download, ExternalLink } from 'lucide-react';
import courseData from '../data/course_structure.json';
import './LessonPage.css';

function LessonPage() {
  // Format duration from HH:mm:ss to HH:mm
  const formatDuration = (duration) => {
    if (!duration) return '';
    const parts = duration.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return duration;
  };

  // Determine if material should open in new tab or download
  const getMaterialAction = (material) => {
    const type = material.type?.toLowerCase();

    // Images and videos open in new tab
    if (type === 'image' || type === 'video') {
      return 'open';
    }

    // Check file extension if type not specified
    if (material.url) {
      const ext = material.url.split('.').pop().toLowerCase();
      const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
      const videoExts = ['mp4', 'webm', 'avi', 'mov', 'mkv'];

      if (imageExts.includes(ext) || videoExts.includes(ext)) {
        return 'open';
      }
    }

    // Everything else should download
    return 'download';
  };

  // Get icon for material type
  const getMaterialIcon = (material) => {
    const type = material.type?.toLowerCase();

    if (type === 'image') return <FileImage size={16} />;
    if (type === 'video') return <Video size={16} />;

    // Check extension if type not specified
    if (material.url) {
      const ext = material.url.split('.').pop().toLowerCase();
      const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
      const videoExts = ['mp4', 'webm', 'avi', 'mov', 'mkv'];

      if (imageExts.includes(ext)) return <FileImage size={16} />;
      if (videoExts.includes(ext)) return <Video size={16} />;
    }

    return <Download size={16} />;
  };

  const { weekIndex, lessonIndex } = useParams();
  const course = courseData.course;
  const week = course.weeks[parseInt(weekIndex)];
  const lesson = week?.lessons[parseInt(lessonIndex)];

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});

  useEffect(() => {
    // Set first video as default and expand first chapter
    if (lesson?.chapters?.length > 0 && lesson.chapters[0].videos?.length > 0) {
      setSelectedVideo({
        video: lesson.chapters[0].videos[0],
        chapterIndex: 0,
        videoIndex: 0
      });
      setExpandedChapters({ 0: true });
    }
  }, [weekIndex, lessonIndex, lesson]);

  const toggleChapter = (index) => {
    setExpandedChapters(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const selectVideo = (video, chapterIndex, videoIndex) => {
    setSelectedVideo({ video, chapterIndex, videoIndex });
    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!week || !lesson) {
    return (
      <div className="lesson-page">
        <div className="container">
          <div className="error-message">
            <h2>Lesson not found</h2>
            <Link to="/course/1" className="back-link">
              <ArrowLeft size={20} />
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page">
      {/* Lesson Header */}
      <div className="lesson-header">
        <div className="container">
          <Link to="/course/1" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Course</span>
          </Link>
          <div className="lesson-header-content">
            <div className="week-badge">{week.name}</div>
            <h1>{lesson.name}</h1>
            {lesson.description && (
              <p className="lesson-header-description">{lesson.description}</p>
            )}
            <div className="lesson-header-meta">
              <span>
                <Clock size={16} />
                {formatDuration(lesson.duration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lesson-content">
        <div className="container">
          <div className="lesson-layout">
            {/* Video Player */}
            <div className="video-section">
              {selectedVideo ? (
                <>
                  <div className="video-wrapper">
                    <video
                      key={selectedVideo.video.video_url}
                      controls
                      className="video-player"
                      src={`/${selectedVideo.video.video_url}`}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="video-info">
                    <h2>{selectedVideo.video.name}</h2>
                    <div className="video-meta">
                      <span className="duration">
                        <Clock size={16} />
                        {formatDuration(selectedVideo.video.duration)}
                      </span>
                    </div>
                    {selectedVideo.video.additional_materials &&
                     selectedVideo.video.additional_materials.length > 0 && (
                      <div className="additional-materials">
                        <h3>Additional Materials</h3>
                        <ul className="materials-list">
                          {selectedVideo.video.additional_materials.map((material, idx) => {
                            const action = getMaterialAction(material);
                            const icon = getMaterialIcon(material);

                            return (
                              <li key={idx} className="material-item">
                                <a
                                  href={material.url ? `/${material.url}` : '#'}
                                  target={action === 'open' ? '_blank' : '_self'}
                                  rel={action === 'open' ? 'noopener noreferrer' : undefined}
                                  download={action === 'download' ? material.name : undefined}
                                  className="material-link"
                                >
                                  <span className="material-icon">{icon}</span>
                                  <span className="material-content">
                                    <strong className="material-name">{material.name}</strong>
                                    {material.description && (
                                      <span className="material-description"> - {material.description}</span>
                                    )}
                                  </span>
                                  <span className="material-action-icon">
                                    {action === 'open' ? <ExternalLink size={14} /> : <Download size={14} />}
                                  </span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="no-video">
                  <Play size={64} />
                  <p>Select a video to start watching</p>
                </div>
              )}
            </div>

            {/* Chapters Sidebar */}
            <div className="chapters-section">
              <div className="chapters-header">
                <h3>Chapters & Videos</h3>
                <span className="chapters-count">
                  {lesson.chapters.reduce((acc, ch) => acc + ch.videos.length, 0)} videos
                </span>
              </div>

              <div className="chapters-list">
                {lesson.chapters.map((chapter, chapterIndex) => (
                  <div key={chapterIndex} className="chapter-card">
                    <div
                      className="chapter-header"
                      onClick={() => toggleChapter(chapterIndex)}
                    >
                      <div className="chapter-header-content">
                        <h4>{chapter.name}</h4>
                        {chapter.duration && (
                          <span className="chapter-duration">
                            <Clock size={14} />
                            {formatDuration(chapter.duration)}
                          </span>
                        )}
                      </div>
                      <button className="expand-button">
                        {expandedChapters[chapterIndex] ?
                          <ChevronDown size={20} /> :
                          <ChevronRight size={20} />
                        }
                      </button>
                    </div>

                    {expandedChapters[chapterIndex] && (
                      <div className="videos-list">
                        {chapter.videos.map((video, videoIndex) => (
                          <div
                            key={videoIndex}
                            className={`video-item ${
                              selectedVideo?.video.video_url === video.video_url ? 'active' : ''
                            }`}
                            onClick={() => selectVideo(video, chapterIndex, videoIndex)}
                          >
                            <div className="video-item-icon">
                              <Play size={14} />
                            </div>
                            <div className="video-item-info">
                              <span className="video-name">{video.name}</span>
                              <span className="video-duration">{formatDuration(video.duration)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;
