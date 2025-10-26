# Learning Platform

A modern, mobile-first learning platform built with React that displays course content from JSON files with video playback capabilities.

## Features

### 🎨 Modern UI/UX
- **Mobile-First Design** - Optimized for all screen sizes
- **Dark Theme** - Easy on the eyes with purple/indigo gradient accents
- **Smooth Animations** - Polished hover effects and transitions
- **Responsive Navigation** - Sticky header with adaptive layout

### 📚 Course Management
- **Course Overview** - Browse all available courses
- **Week-Based Structure** - Courses organized into weekly modules
- **Collapsible Sections** - Expand/collapse weeks to view lessons
- **Webinar Support** - Dedicated sections for weekly webinars

### 🎥 Video Learning
- **Embedded Video Player** - Native HTML5 video playback
- **Chapter Organization** - Videos grouped by chapters within lessons
- **Progress Tracking** - Visual indicators for active videos
- **Additional Materials** - Support for supplementary resources

### 📱 Page Structure

1. **Landing Page** (`/`)
   - Hero section with call-to-action
   - Feature highlights
   - Responsive design

2. **Courses List** (`/courses`)
   - Display all available courses
   - Course statistics (videos, weeks)
   - Quick access to course content

3. **Course Detail** (`/course/:id`)
   - Complete course overview
   - Week-by-week breakdown
   - Collapsible lesson lists with descriptions
   - Webinar sections

4. **Lesson Page** (`/course/:id/week/:weekIndex/lesson/:lessonIndex`)
   - Video player with current selection
   - Sidebar with all chapters and videos
   - Video metadata and additional materials
   - Easy navigation between videos

## Technology Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **CSS3** - Custom styling with CSS variables

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── public/
│   └── videos/          # Video files
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── Navigation.css
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LandingPage.css
│   │   ├── CoursesPage.jsx
│   │   ├── CoursesPage.css
│   │   ├── CourseDetailPage.jsx
│   │   ├── CourseDetailPage.css
│   │   ├── LessonPage.jsx
│   │   └── LessonPage.css
│   ├── data/
│   │   └── course_structure.json
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Course Data Format

The platform reads course data from `src/data/course_structure.json`. The structure includes:

- Course metadata (name, description)
- Weeks with lessons
- Lessons with chapters
- Chapters with videos
- Webinars per week

## Mobile Optimization

The platform follows a mobile-first approach:

- Base styles target mobile devices (320px+)
- Tablet breakpoint at 768px
- Desktop breakpoint at 1024px
- Large desktop at 1440px

All components are touch-friendly with appropriate sizing and spacing.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires HTML5 video support

## License

MIT
