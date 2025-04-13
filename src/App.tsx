import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { checkAuthConfig } from "./utils/authUtils";
import Navbar from "./components/navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import Chat from "./pages/Chat";
import Members from "./pages/Members";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Invitation from "./pages/Invitation";
import NotFound from "./pages/NotFound";
import LibraryManager from "./pages/LibraryManager";
import Announcements from "./pages/Announcements";
import ScreenRecPreview from './pages/ScreenRecPreview';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children, adminOnly = false }: { children: JSX.Element, adminOnly?: boolean }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  // Show loading state or placeholder while authentication state is being determined
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/videos" />;
  }
  
  return children;
};

const AppRoutes = () => {
  // Check auth configuration on app startup (development only)
  useEffect(() => {
    checkAuthConfig().then(result => {
      console.log('Auth configuration check:', result);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/videos" element={
          <ProtectedRoute>
            <Videos />
          </ProtectedRoute>
        } />
        <Route path="/video/:id" element={
          <ProtectedRoute>
            <VideoDetail />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/members" element={
          <ProtectedRoute adminOnly>
            <Members />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute adminOnly>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/library-manager" element={
          <ProtectedRoute adminOnly>
            <LibraryManager />
          </ProtectedRoute>
        } />
        <Route path="/announcements" element={
          <ProtectedRoute adminOnly>
            <Announcements />
          </ProtectedRoute>
        } />
        <Route path="/invitation/:code" element={<Invitation />} />
        <Route path="/screenrec-preview" element={<ScreenRecPreview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
