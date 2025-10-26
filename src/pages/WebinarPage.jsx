import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Users, FileImage, Video, Download, ExternalLink } from 'lucide-react';
import courseData from '../data/course_structure.json';
import './WebinarPage.css';

function WebinarPage() {
  // Format duration from HH:mm:ss to HH:mm
  const formatDuration = (duration) => {
    if (!duration) return '';
    const parts = duration.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return duration;
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

  const { weekIndex, webinarIndex } = useParams();
  const course = courseData.course;
  const week = course.weeks[parseInt(weekIndex)];
  const webinar = week?.webinars[parseInt(webinarIndex)];

  if (!week || !webinar) {
    return (
      <div className="webinar-page">
        <div className="container">
          <div className="error-message">
            <h2>Webinar not found</h2>
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
    <div className="webinar-page">
      {/* Webinar Header */}
      <div className="webinar-header">
        <div className="container">
          <Link to="/course/1" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Course</span>
          </Link>
          <div className="webinar-header-content">
            <div className="week-badge">{week.name}</div>
            <div className="webinar-title-wrapper">
              <Users size={32} className="webinar-title-icon" />
              <h1>{webinar.name}</h1>
            </div>
            <div className="webinar-header-meta">
              <span>
                <Calendar size={16} />
                {formatDate(webinar.date)}
              </span>
              {webinar.video && (
                <span>
                  <Clock size={16} />
                  {formatDuration(webinar.video.duration)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="webinar-content">
        <div className="container">
          <div className="video-section">
            {webinar.video ? (
              <>
                <div className="video-wrapper">
                  <video
                    controls
                    className="video-player"
                    src={`/${webinar.video.video_url}`}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="video-info">
                  <h2>{webinar.video.name}</h2>
                  <div className="video-meta">
                    <span className="duration">
                      <Clock size={16} />
                      {formatDuration(webinar.video.duration)}
                    </span>
                  </div>
                  {webinar.video.additional_materials &&
                   webinar.video.additional_materials.length > 0 && (
                    <div className="additional-materials">
                      <h3>Additional Materials</h3>
                      <ul className="materials-list">
                        {webinar.video.additional_materials.map((material, idx) => {
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
                <Users size={64} />
                <p>Webinar recording not available yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebinarPage;
