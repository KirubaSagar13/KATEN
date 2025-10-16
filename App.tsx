import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import ContactPage from './pages/ContactPage'; // Already imported
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/contact" element={<ContactPage />} /> {/* Add this */}
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
