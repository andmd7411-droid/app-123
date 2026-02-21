import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Placeholder compartments
import ChatApp from './pages/ChatApp.tsx';
import ClipperApp from './pages/ClipperApp.tsx';
import JobTailorApp from './pages/JobTailorApp.tsx';
import FreelancerApp from './pages/FreelancerApp.tsx';
import BuilderApp from './pages/BuilderApp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/clipper" element={<ClipperApp />} />
        <Route path="/job" element={<JobTailorApp />} />
        <Route path="/freelance" element={<FreelancerApp />} />
        <Route path="/builder" element={<BuilderApp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
