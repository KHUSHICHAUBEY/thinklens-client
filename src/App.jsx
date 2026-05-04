import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ui/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NewDebate from './pages/NewDebate'
import LiveDebate from './pages/LiveDebate'
import DebateResult from './pages/DebateResult'
import DebateView from './pages/DebateView'
import History from './pages/History'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import NotFound from './pages/NotFound'
import RealityChecker from './pages/RealityChecker'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid #2a2a4a' }
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/debate/:id/view" element={<DebateView />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/debate/new" element={<ProtectedRoute><NewDebate /></ProtectedRoute>} />
              <Route path="/debate/new/live" element={<ProtectedRoute><LiveDebate /></ProtectedRoute>} />
              <Route path="/debate/:id/result" element={<ProtectedRoute><DebateResult /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
              <Route path="/reality-check" element={<ProtectedRoute><RealityChecker /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App