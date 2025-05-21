
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import Layout from '@/components/Layout';

// Pages
import Index from '@/pages/Index';
import Signin from '@/pages/Signin';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Videos from '@/pages/Videos';
import VideoDetail from '@/pages/VideoDetail';
import LibraryManager from '@/pages/LibraryManager';
import ScreenRecPreview from '@/pages/ScreenRecPreview';
import Members from '@/pages/Members';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import Invitation from '@/pages/Invitation';
import InvitationManager from '@/pages/InvitationManager';
import Chat from '@/pages/Chat';
import Announcements from '@/pages/Announcements';
import WatchHistory from '@/pages/WatchHistory';
import Ebooks from '@/pages/Ebooks';
import BlogManager from '@/pages/BlogManager';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Payment from '@/pages/Payment';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentFailure from '@/pages/PaymentFailure';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="videos" element={<Videos />} />
              <Route path="videos/:id" element={<VideoDetail />} />
              <Route path="library" element={<LibraryManager />} />
              <Route path="preview" element={<ScreenRecPreview />} />
              <Route path="members" element={<Members />} />
              <Route path="profile" element={<Profile />} />
              <Route path="invitation/:code" element={<Invitation />} />
              <Route path="invitation" element={<Invitation />} />
              <Route path="invitations" element={<InvitationManager />} />
              <Route path="chat" element={<Chat />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="history" element={<WatchHistory />} />
              <Route path="ebooks" element={<Ebooks />} />
              <Route path="blog/manage" element={<BlogManager />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="payment" element={<Payment />} />
              <Route path="payment/success" element={<PaymentSuccess />} />
              <Route path="payment/failure" element={<PaymentFailure />} />
              <Route path="404" element={<NotFound />} />
              {/* Redirection explicite de /login vers /signin */}
              <Route path="login" element={<Navigate to="/signin" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
