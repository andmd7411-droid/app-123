import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Placeholder compartments
import ChatApp from './pages/ChatApp';
import ClipperApp from './pages/ClipperApp';
import JobTailorApp from './pages/JobTailorApp';
import FreelancerApp from './pages/FreelancerApp';
import BuilderApp from './pages/BuilderApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/clipper" element={<ClipperApp />} />
        <Route path="/job" element={<JobTailorApp />} />
        <Route path="/freelance" element={<FreelancerApp />} />
        <Route path="/builder" element={<BuilderApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
