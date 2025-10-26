# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mobile-first learning platform built with React that delivers course content with video playback. The platform reads course data from JSON files and provides a structured, week-based learning experience with embedded videos, subtitles, and additional materials.

## Development Commands

### Running the Development Server
```bash
npm run dev
# Runs on http://localhost:5173
```

### Building for Production
```bash
npm run build
# Output: dist/ directory
```

### Linting
```bash
npm run lint
# Uses ESLint with React hooks and React refresh plugins
```

### Preview Production Build
```bash
npm run preview
```

## Architecture

### Routing Structure
The application uses React Router with the following route hierarchy:
- `/` - Landing page with hero and features
- `/courses` - Course listing page
- `/course/:id` - Course detail with week/lesson breakdown
- `/course/:id/week/:weekIndex/lesson/:lessonIndex` - Lesson video player
- `/course/:id/week/:weekIndex/webinar/:webinarIndex` - Webinar player

All routes are defined in `src/App.jsx` with a single persistent `<Navigation />` component.

### Data Flow
- **Single Source of Truth**: `src/data/course_structure.json` contains all course data
- **Structure**: Course → Weeks → Lessons/Webinars → Chapters → Videos
- **URL Indices**: weekIndex and lessonIndex in URLs are zero-based array indices into the JSON structure
- **No State Management Library**: Course data is imported directly via ES6 modules; component state uses React hooks (useState, useEffect)

### Component Organization
```
src/
├── components/         # Shared components (Navigation)
├── pages/             # Route components (one per route)
├── data/              # JSON data files
├── App.jsx            # Router setup
└── main.jsx           # React entry point
```

Each page component has a co-located CSS file (e.g., `LessonPage.jsx` → `LessonPage.css`).

### Video and Media Handling
- **Video Files**: Located in `public/videos/` directory
- **Subtitles**: `.srt` files in same directory, referenced in course_structure.json
- **Additional Materials**: Located in `public/additional/`, can be images, videos, or downloadable files
- **Video URLs**: Relative paths in JSON (e.g., `"videos/001 - Video Name.webm"`)
- **Material Types**: Determined by `type` field or file extension; images/videos open in new tab, other files trigger download

### Styling Approach
- **Mobile-First**: Base styles target 320px+, with breakpoints at 768px (tablet), 1024px (desktop), 1440px (large desktop)
- **CSS Variables**: Theme colors defined in `src/index.css`
- **Dark Theme**: Purple/indigo gradients used throughout
- **No CSS Framework**: Custom CSS with responsive utilities

## Key Implementation Patterns

### Course Data Access
Pages access course data by importing the JSON file and indexing into the structure using URL params:
```javascript
import courseData from '../data/course_structure.json';
const { weekIndex, lessonIndex } = useParams();
const week = courseData.course.weeks[parseInt(weekIndex)];
const lesson = week.lessons[parseInt(lessonIndex)];
```

### Video Selection State
LessonPage maintains selected video state with chapter/video indices:
```javascript
const [selectedVideo, setSelectedVideo] = useState({
  video: videoObject,
  chapterIndex: number,
  videoIndex: number
});
```

### Collapsible Sections
CourseDetailPage and LessonPage use object-based state for expanded/collapsed chapters:
```javascript
const [expandedChapters, setExpandedChapters] = useState({});
// { 0: true, 2: true } means chapters 0 and 2 are expanded
```

## Technology Stack
- **React 19.1.1** - UI library
- **React Router 7.9.4** - Client-side routing
- **Vite 7.1.7** - Build tool and dev server
- **Lucide React 0.546.0** - Icon library (imported as needed, e.g., `import { Play, Clock } from 'lucide-react'`)
- **ESLint** - Linting with React hooks and refresh plugins

## File Naming and Conventions
- Component files: PascalCase with `.jsx` extension (e.g., `LessonPage.jsx`)
- CSS files: Match component name (e.g., `LessonPage.css`)
- No PropTypes or TypeScript - relies on ESLint for basic validation
- Unused vars starting with uppercase or underscore are ignored by ESLint

## Adding New Features

### Adding a New Page
1. Create component in `src/pages/` (e.g., `NewPage.jsx`)
2. Create corresponding CSS file (e.g., `NewPage.css`)
3. Add route in `src/App.jsx`
4. Update Navigation component if page should appear in nav

### Modifying Course Structure
Edit `src/data/course_structure.json`. The structure must maintain:
- Course metadata: name, description
- Weeks array with name, description, lessons, and webinars
- Each lesson contains chapters array
- Each chapter contains videos array with video_url, subtitle_url, additional_materials

### Adding Video Content
1. Place video files in `public/videos/`
2. Place subtitle files (.srt) in same directory
3. Update course_structure.json with relative paths
4. Ensure video format is browser-compatible (.webm, .mp4)
