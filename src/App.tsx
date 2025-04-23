
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { createAuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import Layout from '@/components/Layout';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
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

// Create a client
const queryClient = new QueryClient();

// AppContent component to access hooks inside the Router
const AppContent = () => {
  const navigate = useNavigate();
  const AuthProvider = createAuthProvider(navigate);
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="videos" element={<Videos />} />
          <Route path="videos/:id" element={<VideoDetail />} />
          <Route path="library" element={<LibraryManager />} />
          <Route path="preview" element={<ScreenRecPreview />} />
          <Route path="members" element={<Members />} />
          <Route path="profile" element={<Profile />} />
          <Route path="invitation/:code" element={<Invitation />} />
          <Route path="invitations" element={<InvitationManager />} />
          <Route path="chat" element={<Chat />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="history" element={<WatchHistory />} />
          <Route path="ebooks" element={<Ebooks />} />
          <Route path="blog/manage" element={<BlogManager />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
        <Route path="/videos" element={<Navigate to="/videos" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
