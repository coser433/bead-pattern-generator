import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { HomePage } from '@/pages/HomePage'
import { CreatePage } from '@/pages/CreatePage'
import { SavedPage } from '@/pages/SavedPage'
import { DiscoverPage } from '@/pages/DiscoverPage'
import { CommunityPage } from '@/pages/CommunityPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <HomePage />
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <Header />
                <CreatePage />
              </>
            }
          />
          <Route
            path="/saved"
            element={
              <>
                <Header />
                <SavedPage />
              </>
            }
          />
          <Route
            path="/discover"
            element={
              <>
                <Header />
                <DiscoverPage />
              </>
            }
          />
          <Route
            path="/community"
            element={
              <>
                <Header />
                <CommunityPage />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  )
}