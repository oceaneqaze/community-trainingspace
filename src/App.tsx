import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import VerticalNavbar from './components/sidebar/VerticalNavbar';
import { useIsMobile } from './hooks/use-mobile';
import ChatBubble from './components/chat/ChatBubble';

// Pages
import Index from './pages/Index';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Members from './pages/Members';
import Chat from './pages/Chat';
import LibraryManager from './pages/LibraryManager';
import Announcements from './pages/Announcements';
import Invitation from './pages/Invitation';
import InvitationManager from './pages/InvitationManager';
import '@/App.css';

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

// Layout component to handle responsive layout
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <VerticalNavbar />
      <main className={`flex-1 overflow-auto ${isMobile ? 'pt-[60px]' : ''}`}>
        <div className="container mx-auto p-4 md:p-4">
          {children}
        </div>
      </main>
      <ChatBubble />
    </div>
  );
};

// Create a wrapper component for the redirect
const VideoRedirect = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  return <Navigate to={`/videos/${id}`} replace />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/welcome" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes with layout */}
            <Route path="/videos" element={
              <AppLayout>
                <Videos />
              </AppLayout>
            } />
            <Route path="/videos/:id" element={
              <AppLayout>
                <VideoDetail />
              </AppLayout>
            } />
            <Route path="/profile" element={
              <AppLayout>
                <Profile />
              </AppLayout>
            } />
            <Route path="/chat" element={
              <AppLayout>
                <Chat />
              </AppLayout>
            } />
            <Route path="/invitation/:code" element={<Invitation />} />
            <Route path="/invitation" element={<Invitation />} />
            
            {/* Admin routes */}
            <Route path="/dashboard" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            <Route path="/members" element={
              <AppLayout>
                <Members />
              </AppLayout>
            } />
            <Route path="/library-manager" element={
              <AppLayout>
                <LibraryManager />
              </AppLayout>
            } />
            <Route path="/announcements" element={
              <AppLayout>
                <Announcements />
              </AppLayout>
            } />
            <Route path="/invitations" element={
              <AppLayout>
                <InvitationManager />
              </AppLayout>
            } />
            
            {/* Redirect old /video/:id routes to /videos/:id */}
            <Route path="/video/:id" element={<VideoRedirect />} />
            
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
