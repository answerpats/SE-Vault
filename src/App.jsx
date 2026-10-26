import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ValueVaultPage from './pages/ValueVaultPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import MembershipSignupPage from './pages/MembershipSignupPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import FAQPage from './pages/FAQPage';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="vault" element={<ValueVaultPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="membership" element={<MembershipSignupPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>
        <Route path="/admin/*" element={<Admin />} />
        
        {/* Catch-all route to prevent white screen. Automatically redirects back to home if no matching path is found */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
