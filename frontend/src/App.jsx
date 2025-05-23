import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import ViewJobPage from './pages/ViewJobPage';

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
        </Routes>

        {/* <Route path="/jobs/add" element={<PrivateRoute><AddJobPage /></PrivateRoute>} />
        <Route path="/jobs/edit/:id" element={<PrivateRoute><EditJobPage /></PrivateRoute>} /> */}
      </main>
    </>
  );
}

export default App;
