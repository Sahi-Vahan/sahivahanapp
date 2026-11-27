import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { ScrollToTop } from './components/common/ScrollToTop';

// Layouts
import { UserLayout } from './components/layout/UserLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// User Pages
import { HomePage } from './pages/user/HomePage';
import { AboutPage } from './pages/user/AboutPage';
import { ContactPage } from './pages/user/ContactPage';
import { ServicesPage } from './pages/user/ServicesPage';
import { QueryFormPage } from './pages/user/QueryFormPage';
import { BlogListPage } from './pages/user/blog/BlogListPage';
import { BlogPostPage } from './pages/user/blog/BlogPostPage';
import { ReviewsPage } from './pages/user/ReviewsPage';
import { FeedbackFormPage } from './pages/user/FeedbackFormPage';
import { UserLoginPage } from './pages/user/UserLoginPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminQueriesPage } from './pages/admin/AdminQueriesPage';
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage';
import { AdminOrganizationsPage } from './pages/admin/AdminOrganizationsPage';
import { AdminCreateOrgPage } from './pages/admin/AdminCreateOrgPage';
import { AdminOrgDetailPage } from './pages/admin/AdminOrgDetailPage';
import { AdminEditOrgPage } from './pages/admin/AdminEditOrgPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppDataProvider>
          <ScrollToTop />
          <Routes>
            {/* User Public Routes */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="inquire" element={<QueryFormPage />} />
              <Route path="blogs" element={<BlogListPage />} />
              <Route path="blogs/:slug" element={<BlogPostPage />} />
              <Route path="blog" element={<BlogListPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="feedback" element={<FeedbackFormPage />} />
              <Route path="login" element={<UserLoginPage />} />
            </Route>

            {/* Admin Login (Public for Admins) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="queries" element={<AdminQueriesPage />} />
              <Route path="feedback" element={<AdminFeedbackPage />} />
              <Route path="organizations" element={<AdminOrganizationsPage />} />
              <Route path="organizations/create" element={<AdminCreateOrgPage />} />
              <Route path="organizations/:id" element={<AdminOrgDetailPage />} />
              <Route path="organizations/:id/edit" element={<AdminEditOrgPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

