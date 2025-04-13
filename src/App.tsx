
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import VerticalNavbar from './components/sidebar/VerticalNavbar';

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="flex min-h-screen">
            <VerticalNavbar />
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto p-4">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/welcome" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  
                  {/* User routes */}
                  <Route path="/videos" element={<Videos />} />
                  <Route path="/videos/:id" element={<VideoDetail />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/invitation/:code" element={<Invitation />} />
                  
                  {/* Admin routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/library-manager" element={<LibraryManager />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/invitations" element={<InvitationManager />} />
                  
                  {/* Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
