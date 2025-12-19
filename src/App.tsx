import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Discover from './pages/Discover';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import PetProfile from './pages/PetProfile';
import CreateProfile from './pages/CreateProfile';
import Profile from './pages/Profile';
import Chats from './pages/Chats';
import ChatDetail from './pages/ChatDetail';
import PawzAI from './pages/PawzAI';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import OwnerProfileSetup from './pages/OwnerProfileSetup';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AuthModal from './components/auth/AuthModal';
import PetIntroModal from './components/profile/PetIntroModal';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AuthModal />
          <PetIntroModal />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route element={<MainLayout />}>
              <Route path="/discover" element={<Discover />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/pawz-ai" element={<PawzAI />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/post/:id" element={<PostDetail />} />
              <Route path="/community/create" element={<CreatePost />} />
              {/* Add other routes here later */}
            </Route>
            <Route path="/chats/:id" element={<ChatDetail />} />
            <Route path="/pet/:id" element={<PetProfile />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/owner-profile-setup" element={<OwnerProfileSetup />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
