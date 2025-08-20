# Rupay Savvy - Affiliate Blogging Platform

[Live Link](https://affiliate-blogging-website.onrender.com/)

## Project Overview

A full-stack affiliate blogging platform built with React and Node.js, using Notion as a headless CMS. The platform features dynamic content loading, search functionality, and SEO optimization.

## Technology Stack

### Frontend

- React.js (Vite)
- TailwindCSS
- React Router DOM
- React Helmet Async (SEO)
- Axios

### Backend

- Node.js
- Express.js
- Notion API
- Node-cron
- Nodemailer

## Core Features

### 1. Content Management

- Integration with Notion Database
- Dynamic content rendering
- Category-based organization

### 2. User Interface Components

#### Navigation (`/frontend/src/components/Navbar.jsx`)

- Responsive navigation bar
- Search integration
- Mobile-friendly hamburger menu

#### Home Page (`/frontend/src/pages/Home.jsx`)

- Infinite scroll with "Load More" functionality
- Shimmer loading states
- Featured posts section
- Toggle Post Details

#### Post Detail (`/frontend/src/pages/PostDetail.jsx`)

- Rich text content rendering
- Related posts recommendations
- Category tags

#### Loading States

- Custom loader component (`/frontend/src/components/Loader/Loader.jsx`)
- Shimmer UI effects (`/frontend/src/components/ShimmerUIs/`)
- Smooth transitions

### 3. Backend Architecture

#### API Routes (`/backend/routes/main.js`)

```javascript
router.route("/posts").get(getAllPostsPageIds);
router.route("/posts/:id").get(getPostDetailByPageIds);
router.route("/blocks/:id").get(getPostBlocksUsingPageId);
router.route("/top-posts").get(getAllTopPostsPageIds);
router.route("/search").get(searchPosts);
router.route("/category").post(getPageIdsOfSameCategory);
```

#### Automated Tasks (`/backend/cron.js`)

- Health check every 13 minutesDaily
- sitemap generation at midnight

### 4. SEO Implementation

- Dynamic meta tags
- Automated sitemap generation
- Structured data
- robots.txt configuration

## Project Structure

```md
frontend/
├── src/
│   ├── components/
│   │   ├── HomeItem.jsx
│   │   ├── Navbar.jsx
│   │   ├── RelatedPosts.jsx
│   │   ├── TopPosts.jsx
│   │   └── ShimmerUIs/
│   │   └── Loader/
│   ├── context/
│   │   ├── NavbarContext.jsx
│   │   └── SearchContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── PostDetail.jsx
│   │   ├── ContactUs.jsx
│   │   └── NotFoundPage.jsx
│   │   └── InfoDisplay.jsx
│   ├── data/
│   │   ├── data.jsx
│   └── App.jsx

backend/
├── controllers/
│   └── main.js
├── routes/
│   └── main.js
├── generateSitemap.js
├── sendEmail.js
├── cron.js
└── index.js
```

## Configuration

### Environment Variables

#### Frontend Environment

```md
VITE_BACKEND_URL=""
VITE_FB_URL=""
VITE_INSTAGRAM_URL=""
VITE_LINKEDIN_URL=""
VITE_PINTEREST_URL=""
VITE_TWITTER_URL=""
```

#### Backend Environment

```md
NOTION_DATABASE_ID=""
NOTION_INTEGRATION_TOKEN=""
NOTION_QUERY_DATABASE_ID=""
RENDER_BACKEND_URL=""
RENDER_FRONTEND_URL=""
```

## Installation & Setup

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
node index.js
```

## Performance Optimizations

- Debounced search functionality
- Optimized API calls
- Efficient state management using Context API

## Contact Form Integration

- Notion database integration for queries tracking
- Email notification system
- Form validation
- Success/Error notifications using Toast

## Additional Features

- Notion Database makes CRUD operations secure and easy using its Headless CMS interface
- Custom scrollbar styling
- Responsive design
- Footer with Social media integration
- Error boundary implementation
- 404 page handling
