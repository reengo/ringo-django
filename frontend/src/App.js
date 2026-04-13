import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CONFIG, sections } from './config';
import Login from './pages/Login';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

import './App.css';

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDark = () => setDarkMode((v) => !v);

  useEffect(() => {
    document.documentElement.style.setProperty("--neutral",     darkMode ? CONFIG.colors.darkNeutral : CONFIG.colors.neutral);
    document.documentElement.style.setProperty("--text-color",  darkMode ? CONFIG.colors.darkText    : "#0f172a");
  }, [darkMode]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", CONFIG.colors.primary);
    document.documentElement.style.setProperty("--accent",  CONFIG.colors.accent);

    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/png";
    link.rel  = "shortcut icon";
    link.href = CONFIG.logoPath;
    if (!document.querySelector("link[rel*='icon']")) document.getElementsByTagName("head")[0].appendChild(link);

    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Landing CONFIG={CONFIG} sections={sections} darkMode={darkMode} toggleDark={toggleDark} loading={loading} />
        } />
        <Route path="/blogs"     element={<Blog       darkMode={darkMode} toggleDark={toggleDark} />} />
        <Route path="/resume"    element={<Navigate to="/blogs" replace />} />
        <Route path="/blog/:id"  element={<BlogDetail darkMode={darkMode} toggleDark={toggleDark} />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<RegisterAndLogout />} />
        <Route path="/*"         element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
