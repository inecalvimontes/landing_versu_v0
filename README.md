# Landing Page Project

A modern landing page built with React, Vite, Tailwind CSS, and Express.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

2. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Building for Production

3. Build the project:
```bash
npm run build
```

4. Preview the production build:
```bash
npm run preview
```

### Running with Express Server

5. After building, run the Express server:
```bash
npm run server
```

The server will run on `http://localhost:5000`

## 📁 Project Structure

```
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── server.js           # Express server (optional)
├── package.json        # Dependencies and scripts
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Main App component
    └── index.css       # Tailwind CSS imports
```

## 🎨 Customization

- Edit `src/App.jsx` to modify the landing page content
- Tailwind CSS classes are used throughout for styling
- Modify `tailwind.config.js` to customize the theme
- Add new components in the `src/` directory

## 📝 Notes

- The Express server (`server.js`) is optional and mainly useful for:
  - API endpoints
  - Serving the built React app in production
  - Server-side routing if needed

- For development, use `npm run dev` which uses Vite's dev server
- The current setup includes a basic landing page template that you can customize based on your mockup
