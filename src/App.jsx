import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './routes/ProtectedRoutes.jsx'
import { Layout } from './components/Layout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'
import UsersPage from './pages/UsersPage.jsx'
import PurchasePage from './pages/PurchasePage.jsx';
import TransferPage from './pages/TransferPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import AssignmentPage from './pages/AssignmentPage.jsx';
import { UnauthorizedPage } from './pages/UnauthorizedPage.jsx';
import { AssetBaseProvider } from './context/AssetBaseContext.jsx';

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <AssetBaseProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={
                  <ProtectedRoute allowedRoles={['admin', 'base_commander', 'logistics_officer']}>
                    <Layout />
                  </ProtectedRoute>}>

                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />

                  <Route path="/purchase" element={<PurchasePage />} />
                  <Route path="/transfer" element={<TransferPage />} />
                  <Route path="/assignment" element={<AssignmentPage />} />
                  <Route path="/reports" element={<ReportsPage />} />

                  <Route path="/profile" element={<ProfilePage />} />
                </Route>

                <Route element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Layout />
                  </ProtectedRoute>}>

                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>


                {/* Catch-all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
            <Toaster position="top-right" />
          </AssetBaseProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App