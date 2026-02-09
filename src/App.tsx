import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import OpenAccountPage from './pages/OpenAccountPage'
import DashboardPage from './pages/DashboardPage'
import TransferPage from './pages/TransferPage'
import TransactionsPage from './pages/TransactionsPage'
import TransactionDetailPage from './pages/TransactionDetailPage'
import DirectBankLinkPage from './pages/DirectBankLinkPage'
import HowItWorksPage from './pages/HowItWorksPage'
import LiveRatesPage from './pages/LiveRatesPage'
import TeamPage from './pages/TeamPage'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/" state={{ scrollTo: 'login' }} replace />} />
          <Route path="/open-account" element={<OpenAccountPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/rates" element={<LiveRatesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/transfer" element={<ProtectedRoute><TransferPage /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
          <Route path="/transactions/:id" element={<ProtectedRoute><TransactionDetailPage /></ProtectedRoute>} />
          <Route path="/banks" element={<DirectBankLinkPage />} />
          <Route path="/direct-bank-link" element={<DirectBankLinkPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </HashRouter>
  )
}

export default App
