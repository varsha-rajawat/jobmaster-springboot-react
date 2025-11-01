import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import ViewJobPage from './pages/ViewJobPage';
import InsightsPage from './pages/InsightsPage';
import AiResumeAnalysis from './pages/AiResumeAnalysis';

function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />

          <Route path="/signup" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />

          <Route path="/jobs/:id" element={
            <PrivateRoute>
              <ViewJobPage />
            </PrivateRoute>
          } />

          <Route path="/insights" element={<PrivateRoute>
            <InsightsPage />
          </PrivateRoute>} />

          <Route path="/ai/resume-analysis" element={<PrivateRoute><AiResumeAnalysis /></PrivateRoute>} />


        </Routes>
      </main>
    </>
  );
}

export default App;
